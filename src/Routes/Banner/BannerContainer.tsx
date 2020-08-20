import React, {useState} from "react";
import BannerPresenter from "./BannerPresenter";
import * as Azure from "../../bundle/azure-storage.blob";

const BannerContainer: React.FunctionComponent = () => {
    const [imgFile, setImgFile] = useState<any>();

    const containerName = "images";

    const getBlobService = () => {

        const account = "saracencentre";
        const sas =
            "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-08-29T15:38:21Z&st=2020-08-18T07:38:21Z&sip=203.236.109.154&spr=https,http&sig=xuAPc2eFjEyE5NpWIxLMjUQzej2gt4nY9A09vZR79no%3D";
        const blobUri = "https://" + account + ".blob.core.windows.net";

        const blobService = Azure.createBlobServiceWithSas(blobUri, sas).withFilter(
            new Azure.ExponentialRetryPolicyFilter()
        );

        return blobService;
    };

    const createContainer = () => {
        const blobService = getBlobService();
        if (!blobService) {
            return;
        }

        if (!Azure.Validate.containerNameIsValid(containerName)) {
            alert("Invalid container name!");
            return;
        }

        blobService.createContainerIfNotExists(
            containerName,
            (error: any, result: any) => {
                if (error) {
                    alert(
                        "Create container failed, open browser console for more detailed info."
                    );
                    console.log(error);
                } else {
                    alert("Create " + containerName + " successfully!");
                }
            }
        );
    };
    // x-ms-request-id,Server,x-ms-version,Content-MD5,x-ms-request-server-encrypted,Content-Length,Date,Transfer-Encoding
    // x-ms-request-id,Server,x-ms-version,Content-MD5,Last-Modified,ETag,x-ms-request-server-encrypted,Content-Length,Date,Transfer-Encoding

    const uploadBlobByStream = async (checkMD5: any, file: File) => {
        const blobService = await getBlobService();
        if (!blobService) {
            return;
        }

        console.log(blobService, file);

        const blockSize =
            file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
        const options = {
            storeBlobContentMD5: checkMD5,
            blockSize,
        };
        blobService.singleBlobPutThresholdInBytes = blockSize;

        let finishedOrError = false;

        blobService.createBlockBlobFromBrowserFile(
            containerName,
            file.name,
            file,
            options,
            (error: any, result: any, response: any) => {
                finishedOrError = true;
                if (error) {
                    alert("Upload failed, open browser console for more detailed info.");
                    console.log(error);
                } else {
                    setTimeout(() => {
                        alert("Upload successfully!");
                    }, 1000);
                }
            }
        );
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append("file", imgFile);

        uploadBlobByStream(false, imgFile);
    };

    const onChange = ({
                          target: {
                              validity,
                              files: [file],
                          },
                      }: any) => {
        console.log(validity, file);
        if (validity.valid) {
            return setImgFile(file);
        }
        return false;
    };

    return <BannerPresenter onChange={onChange} onSubmit={onSubmit}/>;
};

export default BannerContainer;

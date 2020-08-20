import * as Azure from "../bundle/azure-storage.blob";


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

const createContainer = (containerName: string, callBack : Function) => {

    const blobService = getBlobService();
    if(!blobService){
        return false;
    }

    if (!blobService.Validate.containerNameIsValid(containerName)) {
        alert("Invalid container name!");
        return;
    }

    blobService.createContainerIfNotExists(
        containerName,
        (error: any, result: any): void => {
            if (error) {
                alert(
                    "컨테이너 생성에 실패했습니다. 디테일한 정보를 확인하세요."
                );
                console.log(error);
            } else {
                console.log(result)
                alert(containerName + " 컨테이너를 성공적으로 생성하였습니다.");
            }
        }
    );
};

const uploadBlobByStream = async (checkMD5: any, file: File, name : string) => {
    const blobService = await getBlobService();


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
        name,
        file.name,
        file,
        options,
        (error: any) => {
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
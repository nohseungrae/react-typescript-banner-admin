import React, {useEffect, useState} from "react";
import BannerPresenter from "./BannerPresenter";
import {createContainerAndUpload} from "../../utils/AzureUpload/azureUpload";
import azure from "azure-storage";

const BannerContainer: React.FunctionComponent = () => {
    const [imgFile, setImgFile] = useState<any>([]);
    const [url, setUrl] = useState<string>("");
    const [name, setName] = useState<string>("")


    const connectionString = "BlobEndpoint=https://saracencentre.blob.core.windows.net/;SharedAccessSignature=sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-01T11:02:37Z&st=2020-08-23T03:02:37Z&spr=https,http&sig=Bdlzoxh9PLJ%2FqTwqXZX0Pdl8r40mKngwTj6rhMAqGfM%3D";
    const containerName = "images";

    const asyncF = () => {
        return new Promise((resolve) => {
            resolve(createContainerAndUpload(connectionString, containerName, imgFile));
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let result;
        setTimeout(() => {
            result = asyncF();
        }, 0)
        console.log(result);

    };

    const onChange = ({
                          target: {
                              validity,
                              files: [file],
                          },
                      }: any) => {
        console.log(validity, file);
        if (validity.valid) {
            return setImgFile([...imgFile, file]);
        }
        return false;
    };

    useEffect(() => {
        if (name !== "") {
        }
    }, [name])

    return <BannerPresenter onChange={onChange} onSubmit={onSubmit}/>;
};

export default BannerContainer;

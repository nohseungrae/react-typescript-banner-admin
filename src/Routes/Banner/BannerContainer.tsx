import React, {useEffect, useState} from "react";
import BannerPresenter from "./BannerPresenter";
import {createContainerAndUpload} from "../../utils/AzureUpload/azureUpload";

const BannerContainer: React.FunctionComponent = () => {
    const [imgFile, setImgFile] = useState<any>();
    const [url, setUrl] = useState<string>("");

    const containerName = "images";

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(createContainerAndUpload(containerName,imgFile));
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

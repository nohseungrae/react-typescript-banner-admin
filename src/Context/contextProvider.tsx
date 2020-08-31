import React, {useEffect, useState} from "react";
import Context from "./context";

interface IUpload {
    description: string,
    link: string
    image: string
    file: File
}

const ContextProvider: React.FunctionComponent = ({children}) => {
    const [beltOpen, setBeltOpen] = useState<boolean>(false);
    const [logoOpen, setLogoOpen] = useState<boolean>(false);
    const [mainBeltOpen, setMainBeltOpen] = useState<boolean>(false);


    const [reserveCheck, setReserveCheck] = useState<boolean>(false);
    const [files, setFiles] = useState<[]>([]);
    const [filename, setFilename] = useState<string>("");

    const [pathname, setPathname] = useState<string>("");
    const [formData, setFormData] = useState<IUpload>();

    const handleReserve = () => {
        setReserveCheck(!reserveCheck)
    }

    const provider = {
        beltOpen, logoOpen, mainBeltOpen,
        setBeltOpen, setLogoOpen, setMainBeltOpen,
        reserveCheck,
        handleReserve,
        pathname, setPathname,
        files, setFiles, filename, setFilename,
        formData, setFormData
    };
    return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default ContextProvider;

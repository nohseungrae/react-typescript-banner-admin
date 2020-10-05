import React, {useState} from "react";
import Context from "./context";
import {IBanners} from "../Components/Banner/InputCard";

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
    const [files, setFiles] = useState({});

    const [initialValues, setValueData] = useState<IBanners>()
    const [key, setKey] = useState<string>()

    const [filename, setFilename] = useState({
        img: "",
        backImg: ""
    });

    const [startDate, setStartDate] = useState<Date | null>();

    const [pathname, setPathname] = useState<string>("");
    const [formData, setFormData] = useState<IUpload>();

    const [deleteResult, setDelete] = useState<boolean>(false)
    const [reservedDelete, setReservedDelete] = useState()
    const [addResult, setAdd] = useState<boolean>(false)

    const handleReserve = () => {
        setReserveCheck(!reserveCheck)
    }

    const provider = {
        beltOpen, logoOpen, mainBeltOpen,
        setBeltOpen, setLogoOpen, setMainBeltOpen,
        reserveCheck, setReserveCheck,
        handleReserve,
        pathname, setPathname,
        files, setFiles, filename, setFilename,
        formData, setFormData,
        initialValues, setValueData,
        key, setKey,
        deleteResult, setDelete,
        addResult, setAdd,
        startDate, setStartDate,
        reservedDelete, setReservedDelete
    };
    return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default ContextProvider;

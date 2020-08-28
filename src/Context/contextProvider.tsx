import React, {useEffect, useState} from "react";
import Context from "./context";

const ContextProvider: React.FunctionComponent = ({children}) => {
    const [beltOpen, setBeltOpen] = useState<boolean>(false);
    const [logoOpen, setLogoOpen] = useState<boolean>(false);
    const [mainBeltOpen, setMainBeltOpen] = useState<boolean>(false);


    const [reserveCheck, setReserveCheck] = useState<boolean>(false);
    const [files, setFiles] = useState<[]>([]);
    const [filename, setFilename] = useState<string>("");

    const handleReserve = () => {
        setReserveCheck(!reserveCheck)
    }

    const provider = {
        beltOpen, logoOpen, mainBeltOpen,
        setBeltOpen, setLogoOpen, setMainBeltOpen,
        reserveCheck,
        handleReserve,
        files, setFiles, filename, setFilename
    };
    return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default ContextProvider;

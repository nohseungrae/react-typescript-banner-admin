import React, { useEffect, useState } from "react";
import Context from "./context";

const ContextProvider: React.FunctionComponent = ({ children }) => {

  const [reserveCheck , setReserveCheck] = useState<boolean>(false);
  const [files, setFiles] = useState<[]>([]);
  const [filename, setFilename] = useState<string>("");

  const handleReserve = () => {
    setReserveCheck(!reserveCheck)
  }

  const provider = {
    reserveCheck,
    handleReserve,
    files,setFiles,filename,setFilename
  };
  return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default ContextProvider;

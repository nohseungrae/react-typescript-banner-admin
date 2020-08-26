import React, { useEffect, useState } from "react";
import Context from "./context";

const ContextProvider: React.FunctionComponent = ({ children }) => {

  const [reserveCheck , setReserveCheck] = useState(false);

  const handleReserve = () => {
    setReserveCheck(!reserveCheck)
  }

  const provider = {
    reserveCheck,
    handleReserve
  };
  return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default ContextProvider;

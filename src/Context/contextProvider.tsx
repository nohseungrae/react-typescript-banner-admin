import React, { useEffect, useState } from "react";
import Context from "./context";

const ContextProvider: React.FunctionComponent = ({ children }) => {

  const provider = {

  };

  return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default ContextProvider;

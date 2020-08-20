import React from "react";
import AppPresenter from "./AppPresenter";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import { ThemeProvider } from "@saraceninc/saracen-style-ts/lib/typed-components";

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <AppPresenter isLoggedIn={true} />
    <SS.GlobalStyles />
  </ThemeProvider>
);

export default AppContainer;

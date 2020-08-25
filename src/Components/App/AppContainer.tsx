import React from "react";
import AppPresenter from "./AppPresenter";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import {ThemeProvider} from "@saraceninc/saracen-style-ts/lib/typed-components";
import {createMuiTheme, ThemeProvider as ThemeP} from "@material-ui/core"
import ContextProvider from "../../Context/contextProvider";

const themeM = createMuiTheme({
    palette: {
        secondary: {
            main : theme.pink,
        },
    },
});

const AppContainer = () => (
    <ContextProvider>
        <ThemeP theme={themeM}>
            <ThemeProvider theme={theme}>
                <AppPresenter isLoggedIn={true}/>
                <SS.GlobalStyles/>
            </ThemeProvider>
        </ThemeP>
    </ContextProvider>
);

export default AppContainer;

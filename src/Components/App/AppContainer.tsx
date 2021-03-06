import React from "react";
import AppPresenter from "./AppPresenter";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import {ThemeProvider} from "@saraceninc/saracen-style-ts/lib/typed-components";
import {createMuiTheme, ThemeProvider as ThemeP} from "@material-ui/core"
import ContextProvider from "../../Context/contextProvider";
import {ApolloProvider} from "@apollo/client";
import client from "../../ApolloClient";

const themeM = createMuiTheme({
    palette: {
        secondary: {
            main: theme.pink,
        },
    },
});

const AppContainer = () => (
    <ApolloProvider client={client}>
        <ContextProvider>
            <ThemeP theme={themeM}>
                <ThemeProvider theme={theme}>
                    <AppPresenter isLoggedIn={true}/>
                    <SS.GlobalStyles/>
                </ThemeProvider>
            </ThemeP>
        </ContextProvider>
    </ApolloProvider>

);

export default AppContainer;

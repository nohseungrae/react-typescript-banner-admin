import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import SS from "@saraceninc/saracen-style-ts";
import Login from "../../Routes/Login";
import LoginCheck from "../../Routes/LoginCheck";
import MyInfo from "../../Routes/MyInfo";
import PropTypes from "prop-types";
import Banner from "../../Routes/Banner";

interface IProps {
    isLoggedIn: boolean;
}

const AppPresenter: React.FunctionComponent<IProps> = ({isLoggedIn}) => (
    <>
        <Router>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>}</Router>
    </>
);

const LoggedOutRoutes: React.FunctionComponent = () => (
    <>
        <SS.Aside
            navs={[
                {
                    id: 1,
                    opened: false,
                    currents: ["/cs/"],
                    icon: "face",
                    title: "CS파트",
                    deps: [
                        {
                            to: "/cs/second",
                            title: "Second",
                            paths: ["/cs/second"],
                        },
                    ],
                },
                {
                    id: 2,
                    opened: false,
                    currents: ["/aa/"],
                    icon: "policy",
                    title: "로그인된메뉴",
                    deps: [
                        {
                            to: "/aa/first",
                            title: "aaaa",
                            paths: ["/aa/first"],
                        },
                    ],
                },
            ]}
        />
        <SS.Header
            navs={[
                {
                    to: "/auth/login",
                    icon: "account_box",
                    title: "로그인",
                },
            ]}
        />
        <SS.Core.Main justifyContent="center" flexDirection="column">
            <Switch>
                <Redirect from="*" to="/cs/first"/>
            </Switch>
        </SS.Core.Main>
    </>
);

const LoggedInRoutes: React.FunctionComponent = () => (
    <>
        <SS.Aside
            navs={[
                {
                    id: 1,
                    opened: false,
                    currents: ["/banners"],
                    icon: "inbox",
                    title: "배너",
                    deps: [
                        {
                            to: "/banners/care/1",
                            title: "케어",
                            paths: ["/banners/care"],
                        },
                    ],
                },
            ]}
        />
        <SS.Header
            navs={[
                {
                    to: `/auth/me`,
                    icon: "settings_applications",
                    title: "내정보",
                },
                {
                    to: "/auth/login",
                    icon: "account_box",
                    title: "로그아웃",
                },
            ]}
        />
        <SS.Core.Main justifyContent="center" flexDirection="column">
            <Switch>
                {/*도큐먼트용*/}
                <Route path="/banners/care/:num" component={Banner}/>
                {/*필수요소 - 로그인 : 삭제불가*/}
                <Route path="/auth/login" exact={true} component={Login}/>
                <Route path="/auth/login/:id" component={LoginCheck}/>
                <Route path="/auth/me" component={MyInfo}/>
                <Redirect from="*" to="/auth/login"/>
            </Switch>
        </SS.Core.Main>
    </>
);

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default AppPresenter;

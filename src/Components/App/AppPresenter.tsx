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
import Care from "../../Routes/Banner/Care";
import NailArt from "../../Routes/Banner/NailArt";
import Makeup from "../../Routes/Banner/Makeup";
import Hair from "../../Routes/Banner/Hair";
import Massage from "../../Routes/Banner/Massage";
import Interior from "../../Routes/Banner/Interior";
import Accessory from "../../Routes/Banner/Accessory";
import AppLoading from "../../Routes/Banner/AppLoading";
import Ads from "../../Routes/Banner/Ads";
import Main from "../../Routes/Banner/Main";

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
                            to: "/banners/main/0",
                            title: "메인",
                            paths: ["/banners/main"],
                        },
                        {
                            to: "/banners/care/434/0",
                            title: "케어",
                            paths: ["/banners/care/434"],
                        },
                        {
                            to: "/banners/nailart/2/0",
                            title: "네일아트",
                            paths: ["/banners/nailart/2"],
                        },
                        {
                            to: "/banners/makeup/358/0",
                            title: "메이크업&화장",
                            paths: ["/banners/makeup/358"],
                        },
                        {
                            to: "/banners/hair/538/0",
                            title: "헤어미용",
                            paths: ["/banners/hair/538"],
                        },
                        {
                            to: "/banners/massage/702/0",
                            title: "스파&마사지",
                            paths: ["/banners/massage/702"],
                        },
                        {
                            to: "/banners/interior/204/0",
                            title: "샵인테리어&가구",
                            paths: ["/banners/interior/204"],
                        },
                        {
                            to: "/banners/accessory/513/0",
                            title: "액세서리",
                            paths: ["/banners/accessory/513"],
                        },
                        {
                            to: "/banners/apploading",
                            title: "앱로딩화면",
                            paths: ["/banners/apploading"],
                        },
                        {
                            to: "/banners/ads/0/0",
                            title: "광고배너",
                            paths: ["/banners/ads/0"],
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
                <Route path="/banners/main/:num" exact={true} component={Main}/>
                <Route path="/banners/care/:categoryId/:num" component={Care}/>
                <Route path="/banners/nailart/:categoryId/:num" component={NailArt}/>
                <Route path="/banners/makeup/:categoryId/:num" component={Makeup}/>
                <Route path="/banners/hair/:categoryId/:num" component={Hair}/>
                <Route path="/banners/massage/:categoryId/:num" component={Massage}/>
                <Route path="/banners/interior/:categoryId/:num" component={Interior}/>
                <Route path="/banners/accessory/:categoryId/:num" component={Accessory}/>
                <Route path="/banners/ads/:categoryId/:num" component={Ads}/>
                <Route path="/banners/apploading" component={AppLoading}/>
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

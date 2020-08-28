import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const AppLoadingPresenter = () => {
    return (
        <BannerLayout name={"앱로딩화면"} height={"fit-content"} imgBoxWidth={"fit-content"} children={
            <>
                <InputCard uploadHeight={"fit-content"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default AppLoadingPresenter;
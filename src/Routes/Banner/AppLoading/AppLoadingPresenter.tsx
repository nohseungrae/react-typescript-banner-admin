import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const AppLoadingPresenter = () => {
    return (
        <BannerLayout height={"fit-content"} imgBoxWidth={"fit-content"} children={
            <>
                <InputCard uploadHeight={"fit-content"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default AppLoadingPresenter;
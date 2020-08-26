import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const AppLoadingPresenter = () => {
    return (
        <BannerLayout app={true} children={
            <>
                <InputCard app={true}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default AppLoadingPresenter;
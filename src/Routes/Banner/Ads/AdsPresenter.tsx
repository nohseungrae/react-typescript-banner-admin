import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

const AdsPresenter: React.FunctionComponent = () => {
    return (
        <BannerLayout name={"광고배너"} children={
            <>
                <ContentCard/>
                {/*<InputCard/>*/}
                <ReserveComponent/>
            </>
        }/>
    );
};

export default AdsPresenter;
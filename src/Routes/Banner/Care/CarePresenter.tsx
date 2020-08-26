import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

const CarePresenter: React.FunctionComponent = () => {
    return (
        <BannerLayout children={
            <>
                <ContentCard/>
                <InputCard/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default CarePresenter;
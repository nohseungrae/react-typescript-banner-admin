import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const HairPresenter : React.FunctionComponent = () => {
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

export default HairPresenter;
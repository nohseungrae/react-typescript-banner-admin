import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const InteriorPresenter : React.FunctionComponent = () => {
    return (
        <BannerLayout name={"샵인테리어&가구"} height={"435px"} children={
            <>
                <ContentCard/>
                <InputCard uploadHeight={"435px"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default InteriorPresenter;
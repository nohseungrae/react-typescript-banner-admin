import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const MassagePresenter : React.FunctionComponent = () => {
    return (
        <BannerLayout name={"스파&마사지"} height={"435px"} children={
            <>
                <ContentCard/>
                <InputCard uploadHeight={"435px"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default MassagePresenter;
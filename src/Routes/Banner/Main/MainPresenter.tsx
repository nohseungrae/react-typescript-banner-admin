import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

const MainPresenter : React.FunctionComponent = () => {
    return (
        <BannerLayout height={"75px"} main={true} children={
            <>
                <InputCard uploadHeight={"75px"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default MainPresenter;
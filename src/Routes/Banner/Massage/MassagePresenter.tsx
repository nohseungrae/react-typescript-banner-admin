import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner?: { relationId: string, img: string }
}

const MassagePresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {
    return (
        <BannerLayout banner={banner} name={"스파&마사지"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard uploadHeight={"435px"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default MassagePresenter;
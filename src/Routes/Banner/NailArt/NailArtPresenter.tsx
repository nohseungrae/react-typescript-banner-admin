import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner?: { relationId: string, img: string }
}

const NailArtPresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {
    return (
        <BannerLayout banner={banner} name={"네일아트"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard uploadHeight={"435px"}/>
                <ReserveComponent/>
            </>
        }/>
    );
};

export default NailArtPresenter;
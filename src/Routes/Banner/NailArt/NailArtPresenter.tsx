import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner: { nailArt: IBanner }
}

const NailArtPresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {
    return (
        <BannerLayout banner={banner.nailArt} name={"네일아트"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} bannerIndex={banner?.nailArt?.id} uploadHeight={"435px"}/>
                <ReserveComponent banner={banner}/>
            </>
        }/>
    );
};

export default NailArtPresenter;
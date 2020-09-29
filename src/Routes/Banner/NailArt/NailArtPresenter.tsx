import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner: { nailArt: IBanner }
    variables : any
}

const NailArtPresenter: React.FunctionComponent<IProps> = ({bannerList, banner,variables}) => {
    return (
        <BannerLayout banner={banner.nailArt} name={"네일아트"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard variables={variables} banner={banner} bannerIndex={banner?.nailArt?.id} uploadHeight={"435px"} maxWidth={930}/>
                <ReserveComponent id={banner?.nailArt?.id} variables={variables} reservedBanners={banner?.nailArt?.reservedBanners}/>
            </>
        }/>
    );
};

export default NailArtPresenter;
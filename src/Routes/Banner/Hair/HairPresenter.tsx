import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner: { hair: IBanner }
}

const HairPresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {
    return (
        <BannerLayout banner={banner.hair} name={"헤어미용"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} bannerIndex={banner?.hair?.id} uploadHeight={"435px"}/>
                <ReserveComponent reservedBanners={banner?.hair?.reservedBanners}/>
            </>
        }/>
    );
};

export default HairPresenter;
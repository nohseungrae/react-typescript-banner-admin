import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner: { ads: IBanner }
    variables : any
}

const AdsPresenter: React.FunctionComponent<IProps> = ({banner, bannerList,variables}) => {
    return (
        <BannerLayout banner={banner.ads} name={"광고배너"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} bannerIndex={banner?.ads?.id} variables={variables}/>
                <ReserveComponent reservedBanners={banner?.ads?.reservedBanners}/>
            </>
        }/>
    );
};

export default AdsPresenter;
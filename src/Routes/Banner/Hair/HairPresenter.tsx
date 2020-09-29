import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner: { hair: IBanner }
    variables: any
}

const HairPresenter: React.FunctionComponent<IProps> = ({bannerList, banner, variables}) => {
    return (
        <BannerLayout banner={banner.hair} name={"헤어미용"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard variables={variables} banner={banner} bannerIndex={banner?.hair?.id} uploadHeight={"435px"}
                           maxWidth={930}/>
                <ReserveComponent id={banner?.hair?.id} variables={variables}
                                  reservedBanners={banner?.hair?.reservedBanners}/>
            </>
        }/>
    );
};

export default HairPresenter;
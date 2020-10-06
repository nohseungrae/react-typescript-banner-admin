import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner: { emergency: IBanner }
    variables: any
}

const EmergencyPresenter: React.FunctionComponent<IProps> = ({bannerList, banner, variables}) => {
    return (
        <BannerLayout banner={banner?.emergency} name={"긴급배너"} imgBoxWidth={"fit-content"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} bannerIndex={banner?.emergency?.id} uploadHeight={"435px"} maxWidth={930}
                           variables={variables}/>
                <ReserveComponent id={banner?.emergency?.id} reservedBanners={banner?.emergency?.reservedBanners}
                                  variables={variables}/>
            </>
        }/>
    );
};

export default EmergencyPresenter;
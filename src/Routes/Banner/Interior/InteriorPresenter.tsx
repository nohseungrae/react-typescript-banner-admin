import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner: { interior: IBanner }
    variables : any
}

const InteriorPresenter: React.FunctionComponent<IProps> = ({bannerList, banner,variables}) => {
    return (
        <BannerLayout banner={banner.interior} name={"샵인테리어&가구"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} variables={variables} bannerIndex={banner?.interior?.id} uploadHeight={"435px"} maxWidth={930}/>
                <ReserveComponent id={banner?.interior?.id} variables={variables} reservedBanners={banner?.interior?.reservedBanners}/>
            </>
        }/>
    );
};

export default InteriorPresenter;
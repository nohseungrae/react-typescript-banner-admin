import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard, {IBanner, IBanners} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner: { makeUp: IBanner }
    variables : any
}

const MakeupPresenter: React.FunctionComponent<IProps> = ({bannerList, banner,variables}) => {
    return (
        <BannerLayout banner={banner?.makeUp} name={"메이크업&화장"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard variables={variables} banner={banner} bannerIndex={banner?.makeUp?.id} uploadHeight={"435px"} maxWidth={930}/>
                <ReserveComponent variables={variables} id={banner?.makeUp?.id} reservedBanners={banner?.makeUp?.reservedBanners}/>
            </>
        }/>
    );
};

export default MakeupPresenter;
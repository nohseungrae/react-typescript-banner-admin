import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard, {IBanner, IBanners} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner: {makeUp : IBanner}
}

const MakeupPresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {
    return (
        <BannerLayout banner={banner.makeUp} name={"메이크업&화장"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} bannerIndex={banner?.makeUp?.id} uploadHeight={"435px"}/>
                <ReserveComponent banner={banner}/>
            </>
        }/>
    );
};

export default MakeupPresenter;
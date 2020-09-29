import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import ContentCard from "../../../Components/Banner/ContentCard";
import InputCard, {IBanner, IBanners} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    bannerList?: []
    banner: { massage: IBanner }
    variables : any
}

const MassagePresenter: React.FunctionComponent<IProps> = ({bannerList, banner,variables}) => {
    return (
        <BannerLayout banner={banner?.massage} name={"스파&마사지"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard variables={variables} banner={banner} bannerIndex={banner?.massage?.id} uploadHeight={"435px"} maxWidth={930}/>
                <ReserveComponent id={banner?.massage?.id} variables={variables} reservedBanners={banner?.massage?.reservedBanners}/>
            </>
        }/>
    );
};

export default MassagePresenter;
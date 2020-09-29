import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner, IBanners} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner: { accessory: IBanner }
    variables: any;
}

const AccessoryPresenter: React.FunctionComponent<IProps> = ({bannerList, banner,variables}) => {
    return (
        <BannerLayout banner={banner.accessory} name={"악세서리"} imgBoxWidth={"fit-content"} height={"435px"} children={
            <>
                <ContentCard bannerList={bannerList}/>
                <InputCard banner={banner} variables={variables} bannerIndex={banner?.accessory?.id} uploadHeight={"435px"} maxWidth={930}/>
                <ReserveComponent id={banner?.accessory?.id} variables={variables} reservedBanners={banner?.accessory?.reservedBanners}/>
            </>
        }/>
    );
};

export default AccessoryPresenter;
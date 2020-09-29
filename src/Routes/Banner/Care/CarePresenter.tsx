import React, {useEffect, useState} from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner: { care: IBanner }
    variables: any
}

const CarePresenter: React.FunctionComponent<IProps> = ({bannerList, banner, variables}) => {

    return (
        <BannerLayout banner={banner?.care} name={"케어"} height={"435px"}
                      children={
                          <>
                              <ContentCard bannerList={bannerList}/>
                              <InputCard banner={banner} bannerIndex={banner?.care?.id} uploadHeight={"435px"}
                                         maxWidth={930} variables={variables}/>
                              <ReserveComponent id={banner?.care?.id} reservedBanners={banner?.care?.reservedBanners} variables={variables}/>
                          </>
                      }/>
    );
};

export default CarePresenter;
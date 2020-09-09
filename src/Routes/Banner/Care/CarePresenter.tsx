import React, {useEffect, useState} from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner?: { relationId: string, img: string }
}

const CarePresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {

    return (
        <BannerLayout banner={banner} name={"케어"} height={"435px"}
                      children={
                          <>
                              <ContentCard bannerList={bannerList}/>
                              <InputCard uploadHeight={"435px"}/>
                              <ReserveComponent/>
                          </>
                      }/>
    );
};

export default CarePresenter;
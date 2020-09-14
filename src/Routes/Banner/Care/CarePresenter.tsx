import React, {useEffect, useState} from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";

interface IProps {
    bannerList?: []
    banner?: {
        id: number, relationId: number,
        img: string, type: string,
        url: string, alt: string,
        mainCopy: string
    }
}

const CarePresenter: React.FunctionComponent<IProps> = ({bannerList, banner}) => {

    return (
        <BannerLayout banner={banner} name={"케어"} height={"435px"}
                      children={
                          <>
                              <ContentCard bannerList={bannerList}/>
                              <InputCard banner={banner} uploadHeight={"435px"}/>
                              <ReserveComponent/>
                          </>
                      }/>
    );
};

export default CarePresenter;
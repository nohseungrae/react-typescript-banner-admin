import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    banner: { appLoading: IBanner }
}

const AppLoadingPresenter: React.FunctionComponent<IProps> = ({banner}) => {
    return (
        <BannerLayout banner={banner.appLoading} name={"앱로딩화면"} height={"fit-content"} imgBoxWidth={"fit-content"}
                      children={
                          <>
                              <InputCard banner={banner} bannerIndex={banner?.appLoading?.id}
                                         uploadHeight={"fit-content"}/>
                              <ReserveComponent reservedBanners={banner?.appLoading?.reservedBanners}/>
                          </>
                      }/>
    );
};

export default AppLoadingPresenter;
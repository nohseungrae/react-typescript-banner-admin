import React from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard, {IBanner} from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";

interface IProps {
    banner: { appLoading: IBanner }
    variables : any
}

const AppLoadingPresenter: React.FunctionComponent<IProps> = ({banner,variables}) => {
    return (
        <BannerLayout banner={banner.appLoading} name={"앱로딩화면"} height={"fit-content"} imgBoxWidth={"fit-content"}
                      children={
                          <>
                              <InputCard banner={banner} bannerIndex={banner?.appLoading?.id}
                                         uploadHeight={"fit-content"} maxWidth={930}
                                         variables={variables}/>
                              <ReserveComponent id={banner?.appLoading?.id} variables={variables} reservedBanners={banner?.appLoading?.reservedBanners}/>
                          </>
                      }/>
    );
};

export default AppLoadingPresenter;
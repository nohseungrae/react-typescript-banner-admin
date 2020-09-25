import React, {useContext, useEffect, useState} from 'react';
import BannerLayout from "../../../Components/Banner/Layout";
import InputCard from "../../../Components/Banner/InputCard";
import ReserveComponent from "../../../Components/Banner/ReserveComponent";
import ContentCard from "../../../Components/Banner/ContentCard";
import Context from "../../../Context/context";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import SS from "@saraceninc/saracen-style-ts";
import {IStory} from "saracen-storybanner/lib/Stories";

interface IProps {
    bannerList?: []
    saraStory: any[]
    banners: { logo: any, top: any }
    mainBanner: any
    variables: any
}

const MainPresenter: React.FunctionComponent<IProps> = ({saraStory, banners, mainBanner, variables}) => {

    const {beltOpen, setBeltOpen, logoOpen, setLogoOpen, mainBeltOpen, setMainBeltOpen} = useContext(Context)
    const logo = {logo: banners.logo}
    const top = {top: banners.top}
    const story = {story: mainBanner};

    const beltClick = () => {
        setBeltOpen(!beltOpen)
        setLogoOpen(false)
        setMainBeltOpen(false)
    }
    const logoClick = () => {
        setBeltOpen(false)
        setLogoOpen(!logoOpen)
        setMainBeltOpen(false)
    }
    const mainBeltClick = () => {
        setBeltOpen(false)
        setLogoOpen(false)
        setMainBeltOpen(!mainBeltOpen)
    }


    return (
        <>
            <BannerLayout
                banner={banners?.top}
                main={true}
                name={"띠 배너"}
                maxWidth={"1150px"} height={"75px"}
                bgColor={banners?.top?.color}
                children={
                    <>
                        <SS.Core.Button style={{position: "absolute", top: "0", right: "0"}} padding={"2px"}
                                        theme={theme.blue} onClick={beltClick}>
                            CHANGE</SS.Core.Button>
                        {beltOpen ?
                            <>
                                <InputCard top={true} banner={top} bannerIndex={top?.top?.id} uploadHeight={"75px"}
                                           variables={variables}/>
                                <ReserveComponent reservedBanners={top?.top?.reservedBanners}/>
                            </>
                            :
                            <></>}
                    </>
                }/>
            <BannerLayout
                banner={banners?.logo}
                main={true}
                name={"로고"}
                maxWidth={"250px"} height={"70px"}
                children={
                    <>
                        <SS.Core.Button style={{position: "absolute", top: "0", right: "0"}} padding={"2px"}
                                        theme={theme.blue} onClick={logoClick}>
                            CHANGE</SS.Core.Button>
                        {logoOpen ?
                            <>
                                <InputCard logo={true} banner={logo} bannerIndex={logo?.logo?.id}
                                           uploadHeight={"70px"} variables={variables}/>
                                <ReserveComponent reservedBanners={logo?.logo?.reservedBanners}/>
                            </>
                            :
                            <></>}
                    </>
                }/>
            <BannerLayout
                main={true}
                saraStory={saraStory}
                slider={true}
                name={"사라스토리"}
                maxWidth={"760px"} height={"435px"}
                bgColor={"yellow"}
                margin={"0 0 0 190px"}
                children={
                    <>
                        <SS.Core.Button style={{position: "absolute", top: "0", right: "0"}} padding={"2px"}
                                        margin={"0 0 0 5px"}
                                        theme={theme.blue} onClick={mainBeltClick}>
                            CHANGE</SS.Core.Button>

                        {mainBeltOpen ?
                            <>
                                <ContentCard dynamic={true} bannerList={saraStory}/>
                                <InputCard story={true} banner={story} bannerIndex={story?.story?.id}
                                           uploadHeight={"435px"} variables={variables}/>
                                <ReserveComponent reservedBanners={story?.story?.reservedBanners}/>
                            </>
                            :
                            <></>}
                    </>
                }/>
        </>
    );
};

export default MainPresenter;
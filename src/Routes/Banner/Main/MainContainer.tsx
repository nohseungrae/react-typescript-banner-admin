import React, {useEffect, useState} from 'react';
import MainPresenter from "./MainPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_TYPE} from "../../../Graphql";

const MainContainer: React.FunctionComponent<any> = () => {

    const variables = {type: ["sara_story"], relationId: [0]}
    const {data} = useQuery(GET_BANNERS_BY_TYPE, {variables: {typeAndCategoryIdInput: variables}})

    const topAndLogo = data?.getBannerListByGraphAndType.filter((item: any) => item.type.includes('logo') || item.type.includes('top_banner'));
    const saraMain = data?.getBannerListByGraphAndType.filter((item: any) => item.type.includes("sara_story"))


    const [banners, setBanners] = useState({
        logo: {},
        top: {},
    })
    useEffect(() => {
        if (data) {
            setBanners(
                {...banners, logo: topAndLogo[0], top: topAndLogo[1]}
            )
        }
    }, [data])

    return <MainPresenter saraStory={saraMain} banners={banners}/>;

};

export default MainContainer;
import React from "react";
import AdsPresenter from "./AdsPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_TYPE} from "../../../Graphql";

const AdsContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_TYPE, {
        variables: {
            typeAndCategoryIdInput: {
                type: ["ad_login", "ad_myinfo", "ad_searchindex"]
            }
        }
    })

    return <AdsPresenter bannerList={data?.getBannerListByGraphAndType}
                         banner={{ads: data?.getBannerListByGraphAndType[parseInt(num)]}}/>;
};

export default AdsContainer;

import React from "react";
import AdsPresenter from "./AdsPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT, GET_BANNERS_BY_TYPE} from "../../../Graphql";

const AdsContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_ASIWANT, {
        variables: {
            typeAndCategoryIdInput: {
                type: ["ad_login", "ad_myinfo", "ad_searchindex"]
            }
        }
    })

    return <AdsPresenter bannerList={data?.getNewBanners}
                         banner={{ads: data?.getNewBanners[parseInt(num)]}}/>;
};

export default AdsContainer;

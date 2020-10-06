import React from "react";
import AdsPresenter from "./AdsPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const AdsContainer: React.FunctionComponent<any> = ({match: {params: {num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {
            type: ["ad_login", "ad_myinfo", "ad_searchindex"]
        }
    }
    const {data} = useQuery(GET_BANNERS_ASIWANT, {
        variables
    })

    return <AdsPresenter bannerList={data?.getNewBanners}
                         variables={variables}
                         banner={{ads: data?.getNewBanners[parseInt(num)]}}/>;
};

export default AdsContainer;

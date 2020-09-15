import React from "react";
import AccessoryPresenter from "./AccessoryPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";

const AccessoryContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <AccessoryPresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                               banner={{accessory: data?.getBannerListByGraphAndCategoryId[parseInt(num)]}}/>;
};

export default AccessoryContainer;

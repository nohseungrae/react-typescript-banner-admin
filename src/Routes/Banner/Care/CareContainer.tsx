import React, {ClassicComponentClass, ComponentClass, useEffect, useState} from "react";
import CarePresenter from "./CarePresenter";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql/index";
import {useQuery} from "@apollo/client";

const CareContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <CarePresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                          banner={data?.getBannerListByGraphAndCategoryId[parseInt(num)]}/>;
};

export default CareContainer;

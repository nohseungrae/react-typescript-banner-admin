import React from 'react';
import HairPresenter from "./HairPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";
import CarePresenter from "../Care/CarePresenter";

const HairContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <HairPresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                          banner={data?.getBannerListByGraphAndCategoryId[parseInt(num)]}/>;

};

export default HairContainer;
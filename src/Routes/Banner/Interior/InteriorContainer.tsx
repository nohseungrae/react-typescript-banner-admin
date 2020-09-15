import React from 'react';
import InteriorPresenter from "./InteriorPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";

const InteriorContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <InteriorPresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                              banner={{interior: data?.getBannerListByGraphAndCategoryId[parseInt(num)]}}/>;

};

export default InteriorContainer;
import React from 'react';
import MassagePresenter from "./MassagePresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";

const MassageContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <MassagePresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                             banner={{massage: data?.getBannerListByGraphAndCategoryId[parseInt(num)]}}/>;

};

export default MassageContainer;
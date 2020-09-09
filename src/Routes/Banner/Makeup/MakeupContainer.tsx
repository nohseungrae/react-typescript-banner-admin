import React from 'react';
import MakeupPresenter from "./MakeupPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";
import CarePresenter from "../Care/CarePresenter";


const MakeupContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <MakeupPresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                            banner={data?.getBannerListByGraphAndCategoryId[parseInt(num)]}/>;

};

export default MakeupContainer;
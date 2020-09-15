import React from 'react';
import MakeupPresenter from "./MakeupPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";


const MakeupContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <MakeupPresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                            banner={{makeUp: data?.getBannerListByGraphAndCategoryId[parseInt(num)]}}/>;

};

export default MakeupContainer;
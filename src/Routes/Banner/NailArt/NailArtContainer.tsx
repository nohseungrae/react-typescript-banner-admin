import React from "react";
import NailArtPresenter from "./NailArtPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";

const NailArtContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const {data} = useQuery(GET_BANNERS_BY_CATEGORYID,
        {
            variables: {categoryId: parseInt(categoryId)}
        })

    return <NailArtPresenter bannerList={data?.getBannerListByGraphAndCategoryId}
                             banner={data?.getBannerListByGraphAndCategoryId[parseInt(num)]}/>;
};

export default NailArtContainer;

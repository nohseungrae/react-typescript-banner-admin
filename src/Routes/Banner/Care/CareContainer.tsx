import React, {ClassicComponentClass, ComponentClass, useEffect, useState} from "react";
import CarePresenter from "./CarePresenter";
import {GET_BANNERS_ASIWANT} from "../../../Graphql/index";
import {useQuery} from "@apollo/client";

const CareContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {
            relationId: parseInt(categoryId)
        }
    }
    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {variables})
    return <CarePresenter bannerList={data?.getNewBanners}
                          variables={variables}
                          banner={{care: data?.getNewBanners[parseInt(num)]}}/>;
};

export default CareContainer;

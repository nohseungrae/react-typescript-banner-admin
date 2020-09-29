import React from 'react';
import InteriorPresenter from "./InteriorPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT, GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";

const InteriorContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {
            relationId: parseInt(categoryId)
        }
    }

    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {
            variables
        })

    return <InteriorPresenter bannerList={data?.getNewBanners}
                              variables={variables}
                              banner={{interior: data?.getNewBanners[parseInt(num)]}}/>;

};

export default InteriorContainer;
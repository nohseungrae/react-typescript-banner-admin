import React from 'react';
import HairPresenter from "./HairPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const HairContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {relationId: parseInt(categoryId)}
    }

    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {
            variables
        })

    return <HairPresenter bannerList={data?.getNewBanners}
                          variables={variables}
                          banner={{hair: data?.getNewBanners[parseInt(num)]}}/>;

};

export default HairContainer;
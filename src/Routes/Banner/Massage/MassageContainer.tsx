import React from 'react';
import MassagePresenter from "./MassagePresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const MassageContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {relationId: parseInt(categoryId)}
    }

    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {
            variables
        })

    return <MassagePresenter bannerList={data?.getNewBanners}
                             variables={variables}
                             banner={{massage: data?.getNewBanners[parseInt(num)]}}/>;

};

export default MassageContainer;
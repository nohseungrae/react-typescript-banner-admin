import React from 'react';
import MakeupPresenter from "./MakeupPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT, GET_BANNERS_BY_CATEGORYID} from "../../../Graphql";


const MakeupContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {relationId: parseInt(categoryId)}
    }

    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {
            variables
        })

    return <MakeupPresenter bannerList={data?.getNewBanners}
                            variables={variables}
                            banner={{makeUp: data?.getNewBanners[parseInt(num)]}}/>;

};

export default MakeupContainer;
import React from "react";
import AccessoryPresenter from "./AccessoryPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const AccessoryContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {
            relationId: parseInt(categoryId)
        }
    }
    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {variables})

    return <AccessoryPresenter bannerList={data?.getNewBanners}
                               variables={variables}
                               banner={{accessory: data?.getNewBanners[parseInt(num)]}}/>;
};

export default AccessoryContainer;

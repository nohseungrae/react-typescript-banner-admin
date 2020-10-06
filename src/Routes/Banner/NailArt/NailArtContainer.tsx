import React from "react";
import NailArtPresenter from "./NailArtPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const NailArtContainer: React.FunctionComponent<any> = ({match: {params: {categoryId, num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {
            relationId: parseInt(categoryId)
        }
    }

    const {data} = useQuery(GET_BANNERS_ASIWANT,
        {
            variables
        })

    return <NailArtPresenter bannerList={data?.getNewBanners}
                             variables={variables}
                             banner={{nailArt: data?.getNewBanners[parseInt(num)]}}/>;
};

export default NailArtContainer;

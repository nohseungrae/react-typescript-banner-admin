import React from "react";
import EmergencyPresenter from "./EmergencyPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const EmergencyContainer: React.FunctionComponent<any> = ({match: {params: {num}}}) => {

    const variables = {
        typeAndCategoryIdInput: {
            type: ['emergency']
        }
    }
    const {data} = useQuery(GET_BANNERS_ASIWANT, {
        variables
    })

    return <EmergencyPresenter bannerList={data?.getNewBanners}
                               variables={variables}
                               banner={{emergency: data?.getNewBanners[parseInt(num)]}}/>;
};

export default EmergencyContainer;

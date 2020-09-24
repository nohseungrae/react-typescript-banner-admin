import React from 'react';
import AppLoadingPresenter from "./AppLoadingPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const AppLoadingContainer = () => {

    const {data} = useQuery(GET_BANNERS_ASIWANT, {
        variables: {
            typeAndCategoryIdInput: {
                type: "app_splash_image"
            }
        }
    })

    return <AppLoadingPresenter banner={{appLoading: data?.getNewBanners[0]}}/>
};

export default AppLoadingContainer;
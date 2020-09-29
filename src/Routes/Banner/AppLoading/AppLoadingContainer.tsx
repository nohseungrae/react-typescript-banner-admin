import React from 'react';
import AppLoadingPresenter from "./AppLoadingPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";

const AppLoadingContainer = () => {

    const variables = {
        typeAndCategoryIdInput: {
            type: "app_splash_image"
        }
    }

    const {data} = useQuery(GET_BANNERS_ASIWANT, {
        variables
    })

    return <AppLoadingPresenter variables={variables} banner={{appLoading: data?.getNewBanners[0]}}/>
};

export default AppLoadingContainer;
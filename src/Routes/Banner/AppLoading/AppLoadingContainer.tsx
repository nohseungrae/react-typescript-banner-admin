import React from 'react';
import AppLoadingPresenter from "./AppLoadingPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_BY_TYPE} from "../../../Graphql";

const AppLoadingContainer = () => {

    const {data} = useQuery(GET_BANNERS_BY_TYPE, {
        variables: {
            typeAndCategoryIdInput: {
                type: "app_splash_image"
            }
        }
    })

    return <AppLoadingPresenter banner={{appLoading: data?.getBannerListByGraphAndType[0]}}/>
};

export default AppLoadingContainer;
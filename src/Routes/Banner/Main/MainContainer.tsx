import React, {useEffect, useState} from 'react';
import MainPresenter from "./MainPresenter";
import {useQuery} from "@apollo/client";
import {GET_BANNERS_ASIWANT} from "../../../Graphql";
import {DataUtil} from "../../../DataUtil";
import {IBanner} from "../../../Components/Banner/InputCard";

const MainContainer: React.FunctionComponent<any> = ({match: {params: {num}}}) => {

        const variables = {
            typeAndCategoryIdInput: {
                type: ["sara_story"], relationId: 0
            }
        }
        const {data} = useQuery(GET_BANNERS_ASIWANT, {
            variables
        })

        const [saraMain, setSaraMain] = useState<any>();
        const [banners, setBanners] = useState({
            logo: {},
            top: {},
        })

        useEffect(() => {
            const compare = (a: any, b: any) => {
                const relationA = a.seq
                const relationB = b.seq
                let comparison = 0;
                if (relationA === relationB) {
                    comparison = -1;
                } else if (relationA > relationB) {
                    comparison = 1;
                } else if (relationA < relationB) {
                    comparison = -1;
                }
                return comparison;
            }
            const topAndLogo = data?.getNewBanners?.filter((item: any) => item?.type?.includes('logo') || item?.type?.includes('top_banner'))
                .sort((a: any, b: any) => {
                    return parseInt(a.id) - parseInt(b.id)
                })
            const storyFilter: [] = data?.getNewBanners?.filter((item: any) => item?.type?.includes("sara_story"))
            if (data?.getNewBanners) {
                const json = DataUtil.jsonListGroupBy(storyFilter, 'seq' as IBanner).flatMap((item: any) => item).sort(compare);
                setBanners(
                    {...banners, logo: topAndLogo[0], top: topAndLogo[1]}
                )
                setSaraMain(
                    [...json]
                );
            }

        }, [data])

        // if (!num || num > saraMain?.length - 1) {
        //     console.log(num, saraMain?.length)
        //     return <Redirect to={"/"}/>
        // }

        return <MainPresenter saraStory={saraMain} banners={banners} mainBanner={saraMain ? saraMain[parseInt(num)] : []}
                              variables={variables}/>;

    }
;

export default MainContainer;
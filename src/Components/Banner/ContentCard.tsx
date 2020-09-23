import React, {useEffect, useState} from 'react';
import {Link, withRouter, Redirect} from "react-router-dom"
import styled from "styled-components";
import SS from "@saraceninc/saracen-style-ts";
import {ApolloCache, gql, useMutation} from "@apollo/client";
import {ADD_BANNER, DELETE_BANNER, GET_BANNERS_BY_TYPE} from "../../Graphql";
import {IBanners} from "./InputCard";
import {getMilliseconds} from "date-fns";

interface SProps {
    click?: boolean
    sara?: string
}

const Card = styled(SS.Core.Card)<SProps>`
    background-color : ${props => props.click ? props.theme.pink : "none"};
    min-height: 60px;
    a {
      flex-grow: 1;
      display: flex;
      align-items: center;
      >div {
        width: 100%;
      }
    }
    h5{
       color : ${props => props.click ? "white" : props.theme.pink};
    }  
`;
const AddBtn = styled(SS.Core.Button)`
  margin : 0;
  padding : 0;
  flex-grow: 1;
`;

const ContentCard = withRouter(({history, match, bannerList, dynamic}: any) => {

    const goToHere = match.path.split("/")[2];
    const {params: {num, categoryId}} = match;

    const [createBanner, {data}] = useMutation(ADD_BANNER, {
        update(cache: ApolloCache<any>, {data: {addBannerByGraph}}) {
            const {getBannerListByGraphAndType}: any = cache.readQuery({
                query: GET_BANNERS_BY_TYPE,
                variables: {typeAndCategoryIdInput: {type: ["sara_story"], relationId: 0}}
            });
            console.log(getBannerListByGraphAndType, addBannerByGraph)
            cache.writeQuery({
                query: GET_BANNERS_BY_TYPE,
                variables: {typeAndCategoryIdInput: {type: ["sara_story"], relationId: 0}},
                data: {getBannerListByGraphAndType: getBannerListByGraphAndType.concat([addBannerByGraph])}
            })
        }
    });
    const generateRandom = (min: number, max: number) => {
        const ranNum = Math.abs(Math.floor(Math.random() * (max - min + 1)) + Math.floor(+new Date() / 10000));
        console.log(ranNum)
        return ranNum;
    }
    const addBanner = async () => {
        const lastBanner = bannerList[bannerList.length - 1]
        let obj: any = {
            adminId: 0,
            relationId: lastBanner.type === "sara_story" ? generateRandom(lastBanner.relationId, 1000000) : bannerList[0]?.relationId
        };
        Object.keys(lastBanner).forEach(k => {
            if (lastBanner[k] &&
                k !== "__typename" &&
                k !== "id" &&
                k !== "reservedBanners" &&
                k !== "createdAt" &&
                k !== 'relationId') {
                let valueData = "";
                if (k === "seq") {
                    valueData = lastBanner[k] + 1
                }
                if (k === "type") {
                    valueData = lastBanner[k]
                }
                obj[k] = valueData;
            }
        });
        console.log(obj)
        await createBanner({
            variables: {
                bannerData: obj
            }
        })
    }


    useEffect(() => {
        const splitUrl = match.url.split("/");
        const baseUrl = splitUrl.map((x: string, i: number) => splitUrl.length - 1 === i ? null : x);
        if(bannerList)
        history.push(baseUrl.join("/") + `${bannerList?.length - 1}`);
    }, [bannerList])


    console.log(bannerList, match, history, match.url.split("/").join("/"))

    return (
        <SS.Core.RowF style={
            categoryId === "sara_story" ? {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 220px))",
                gridTemplateRows: "repeat(auto-fill,  minmax(60px, 1fr))",
                justifyContent: "center"
            } : {}
        }>
            {
                bannerList?.length > 0 && bannerList?.map((list: any, index: number) => {

                    return (
                        <Card key={index}
                              style={{borderRadius: "3px"}}
                              width={`${categoryId === "sara_story" ? "auto" : 100 / bannerList.length}%`}
                              margin="1%"
                              click={num === index.toString()}>
                            <Link to={`/banners/${goToHere}/${categoryId}/${index}`}
                                  onClick={(e) => match.url === `/banners/${goToHere}/${index}` ? e.preventDefault() : true}>
                                <SS.Core.CardBody padding={"5px 0"}>
                                    <SS.Core.CardTitle
                                        style={{textAlign: "center", margin: "0"}}>{list?.alt}</SS.Core.CardTitle>
                                </SS.Core.CardBody>
                            </Link>
                        </Card>
                    )
                })
            }
            {
                dynamic ? <Card style={{borderRadius: "3px"}}
                                width={`${categoryId === "sara_story" ? "auto" : 100 / bannerList.length}%`}
                                margin="1%">
                        <AddBtn onClick={addBanner}>
                            <SS.Core.CardBody padding={"5px 0"}>
                                <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>추가
                                </SS.Core.CardTitle>
                            </SS.Core.CardBody>
                        </AddBtn>
                    </Card>
                    : <></>
            }

        </SS.Core.RowF>
    );
});

export default ContentCard;
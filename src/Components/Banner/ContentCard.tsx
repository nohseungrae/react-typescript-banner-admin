import React, {useContext, useEffect, useState} from 'react';
import {Link, withRouter, Redirect} from "react-router-dom"
import styled from "styled-components";
import SS from "@saraceninc/saracen-style-ts";
import {ApolloCache, gql, useMutation} from "@apollo/client";
import {ADD_BANNER, DELETE_BANNER, GET_BANNERS_ASIWANT, GET_BANNERS_BY_TYPE} from "../../Graphql";
import {IBanners} from "./InputCard";
import {getMilliseconds} from "date-fns";
import Context from "../../Context/context";

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
export const generateRandom = (min: number, max: number) => {
    const ranNum = Math.abs(Math.floor(Math.random() * (max - min + 1)) + Math.floor(+new Date() / 10000));
    console.log(ranNum)
    return ranNum;
}
const ContentCard = withRouter(({history, match, bannerList, dynamic}: any) => {

    const {deleteResult, setDelete} = useContext(Context)

    const splitUrl = match.url.split("/");
    const baseUrl = splitUrl.map((x: string, i: number) => splitUrl.length - 1 === i ? null : x);

    const goToHere = match.path.split("/")[2];
    const {params: {num, categoryId}} = match;

    const [dumpList, setDumpList] = useState(bannerList);

    const addBanner = async () => {
        if (!dumpList[dumpList.length - 1].__typename) {
            alert("한 번에 하나씩 추가해주세요.")
            return false
        }
        setDumpList([...dumpList, {}])
        setTimeout(() => {
            history.push(baseUrl.join("/") + `${dumpList.length}`)
        }, 100)
    }


    useEffect(() => {
        setDumpList(bannerList)
        console.log(bannerList)
        if (bannerList?.length -1 < num && bannerList[0]?.type === "sara_story") {
            history.push(baseUrl.join("/") + "0")
        }
    }, [bannerList])

    useEffect(() => {
        if (deleteResult) {
            setDumpList(bannerList)
            history.push(baseUrl.join("/") + `${bannerList?.length - 1}`);
            setDelete(false)
        }
    }, [deleteResult])

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
                dumpList?.length > 0 && dumpList?.map((list: any, index: number) => {

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
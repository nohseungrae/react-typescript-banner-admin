import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useRouteMatch} from "react-router"
import {Link,} from "react-router-dom"
import styled from "styled-components";
import SS from "@saraceninc/saracen-style-ts";
import Context from "../../Context/context";
import {IBanner, IBanners} from "./InputCard";

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

interface IProps {
    bannerList: any
    dynamic?: boolean
}

export interface IMatchChild {
    num: string
    categoryId: string
}

export const generateRandom = (min: number, max: number) => {
    const ranNum = Math.abs(Math.floor(Math.random() * (max - min + 1)) + Math.floor(+new Date() / 10000));
    console.log(ranNum)
    return ranNum;
}
const ContentCard: React.FunctionComponent<IProps> = ({bannerList, dynamic}) => {

    const history = useHistory()
    const match = useRouteMatch<IMatchChild>()
    const {params: {num, categoryId}} = match;

    const {deleteResult, setDelete, initialValues, setValueData, key} = useContext(Context)

    const [base, setBase] = useState<[]>([]);

    const goToHere = match.path.split("/")[2];

    const [dumpList, setDumpList] = useState(bannerList);

    const addBanner = async () => {
        if (!dumpList[dumpList.length - 1].__typename) {
            alert("한 번에 하나씩 추가해주세요.")
            return false
        }
        setDumpList([...dumpList, {}])
        setTimeout(() => {
            history.push(base.join("/") + `${dumpList.length}`)
        }, 1)

    }

    useEffect(() => {
        const splitUrl = match.url.split("/");
        const baseUrl = splitUrl.map((x: string, i: number) => splitUrl.length - 1 === i ? null : x);
        setBase(baseUrl as [])
    }, [match])

    useEffect(() => {
        setDumpList(bannerList)
        if (bannerList?.length - 1 < parseInt(num) && bannerList[0]?.type === "sara_story") {
            history.push(base.join("/") + "0")
        }
    }, [bannerList, history])

    useEffect(() => {

        if (deleteResult) {
            setDumpList(bannerList)
            history.push(base.join("/") + `${bannerList?.length - 1}`);
            setDelete(false)
        }
    }, [deleteResult, setDumpList, setDelete, history, bannerList, base])

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
};

export default ContentCard;
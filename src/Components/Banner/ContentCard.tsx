import React, {useEffect} from 'react';
import {Link, withRouter, Redirect} from "react-router-dom"
import styled from "styled-components";
import SS from "@saraceninc/saracen-style-ts";

interface SProps {
    click?: boolean
}

const Card = styled(SS.Core.Card)<SProps>`
    background-color : ${props => props.click ? props.theme.pink : "none"};
    h5{
       color : ${props => props.click ? "white" : props.theme.pink};
    }  
`;


const ContentCard = withRouter(({match, bannerList}: any) => {

    const goToHere = match.path.split("/")[2];
    const {params: {num, categoryId}} = match;

    console.log(bannerList)

    return (
        <SS.Core.RowF>
            {
                bannerList?.length > 0 && bannerList?.map((list: any, index: number) => {
                    console.log(num, index)
                    if (num.length > 1) {
                        return <Redirect to={"/"}/>
                    }
                    return (
                        <Card key={index} style={{borderRadius: "3px"}} width={`${100 / bannerList.length}%`}
                              margin="1%"
                              click={num === index.toString()}>
                            <Link to={`/banners/${goToHere}/${categoryId}/${num.length > 1 ? 0 : index}`}
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
        </SS.Core.RowF>
    );
});

export default ContentCard;
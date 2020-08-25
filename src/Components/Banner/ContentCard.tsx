import React from 'react';
import {Link,withRouter} from "react-router-dom"
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

const ContentCard = withRouter(({match : {params : {num}}}) => {

    console.log(num)
    return (
        <SS.Core.RowF>
            <Card style={{borderRadius: "3px"}} width={`${100 / 3}%`} margin="1%" click={num === "1"}>
                <Link to={"/banners/care/1"}>
                    <SS.Core.CardBody padding={"5px 0"}>
                        <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>hello</SS.Core.CardTitle>
                    </SS.Core.CardBody>
                </Link>
            </Card>
            <Card style={{borderRadius: "3px"}} width={`${100 / 3}%`} margin="1%" click={num === "2"}>
                <Link to={"/banners/care/2"}>
                    <SS.Core.CardBody padding={"5px 0"}>
                        <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>hello</SS.Core.CardTitle>
                    </SS.Core.CardBody>
                </Link>
            </Card>
            <Card style={{borderRadius: "3px"}} width={`${100 / 3}%`} margin="1%" click={num === "3"}>
                <Link to={"/banners/care/3"}>
                    <SS.Core.CardBody padding={"5px 0"}>
                        <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>hello</SS.Core.CardTitle>
                    </SS.Core.CardBody>
                </Link>
            </Card>
        </SS.Core.RowF>
    );
});

export default ContentCard;
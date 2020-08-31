import React from 'react';
import {Link, withRouter} from "react-router-dom"
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

const ContentCard = withRouter(({match}) => {

    const goToHere = match.path.split("/")[2];
    const {params: {num}} = match;

    return (
        <SS.Core.RowF>
            <Card style={{borderRadius: "3px"}} width={`${100 / 3}%`} margin="1%" click={num === "1"}>
                <Link to={`/banners/${goToHere}/1`}
                      onClick={(e) => match.url === `/banners/${goToHere}/1` ? e.preventDefault() : true}>
                    <SS.Core.CardBody padding={"5px 0"}>
                        <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>hello</SS.Core.CardTitle>
                    </SS.Core.CardBody>
                </Link>
            </Card>
            <Card style={{borderRadius: "3px"}} width={`${100 / 3}%`} margin="1%" click={num === "2"}>
                <Link to={`/banners/${goToHere}/2`}
                      onClick={(e) => match.url === `/banners/${goToHere}/2` ? e.preventDefault() : true}>
                    <SS.Core.CardBody padding={"5px 0"}>
                        <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>hello</SS.Core.CardTitle>
                    </SS.Core.CardBody>
                </Link>
            </Card>
            <Card style={{borderRadius: "3px"}} width={`${100 / 3}%`} margin="1%" click={num === "3"}>
                <Link to={`/banners/${goToHere}/3`}
                      onClick={(e) => match.url === `/banners/${goToHere}/3` ? e.preventDefault() : true}>
                    <SS.Core.CardBody padding={"5px 0"}>
                        <SS.Core.CardTitle style={{textAlign: "center", margin: "0"}}>hello</SS.Core.CardTitle>
                    </SS.Core.CardBody>
                </Link>
            </Card>
        </SS.Core.RowF>
    );
});

export default ContentCard;
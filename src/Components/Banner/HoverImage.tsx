import * as React from 'react';
import CS from "@saraceninc/saracen-style-ts"
import styled from "styled-components";

interface IProps {
    url?: string
    hover?: boolean
    x?: number
    y?: number
}

const Container = styled(CS.Core.Container)<IProps>`
    position: fixed;
    left: 0;
    top: 0;
    width: fit-content;
    background: #000;
    z-index: 20000;
    padding: 0;
    visibility: ${props => props.hover ? 'visible' : 'none'};
    opacity: ${props => props.hover ? 1 : 0};
`;

const ImageBox = styled.div`
    width: fit-content;
    img {
      width: 100%;
    }
`;

export const HoverImage: React.FunctionComponent<IProps> = ({x, y, url, hover}) => {
    console.log(x,y)
    return (
        <Container  hover={hover}>
            <ImageBox>
                <img src={url}/>
            </ImageBox>
        </Container>
    );
};
import React, {useEffect, useState} from 'react';
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import SaracenStoryBanner from "saracen-storybanner"

interface SProps {
    height?: string
}

const Row = styled(SS.Core.Row)`
  .story {
    display: block;
    overflow-x: auto;
    width: 100%;
    .sara_story_1 {
      display: flex;
      width: max-content;
      padding: 0 3% 3% 3%;
      li {
        width: 125px;
        margin-right: 10px;
        position: relative;
        display: block;
          .overlay{
            position:absolute;
            bottom: 0;
            z-index: 1;
          }
          img {
            width: 100%;
            border-radius: 0.7em;
            height: 100%;
          }
          span {
            position: absolute;
            bottom: 15px;
            width: 100%;
            z-index: 2;
            text-align: center;
            color: #fff;
          }
      }
    }
  }

  .slick-slider .slick-list, .slick-slider .slick-track {
      transform: translateZ(0);
  }
  .slick-list {
    position: relative;
    display: block;
  }
  .slick-slider {
    height: 100%;
    display: block;
    position: relative;
    z-index: 400;
    overflow-y: hidden;
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
  }
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .slick-next, .slick-prev {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    transform: translateY(-50%);
    cursor: pointer;
    border: none;
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 100%;

    //img{
    //margin: 0 auto;
    //position: relative;
    //}
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    > div {
    height: 100%;
    }
  }
`;
const Col = styled(SS.Core.Col)<SProps>`
  overflow: hidden;
  borderRadius: 5px;
  //max-height: ${props => `calc(${props.height})`};
  .mini-banners{
  position: absolute;
  top: 0;
  right: 0;
    .slick-track{
      display : flex;
      flex-direction: column;
      height: auto !important;
      .slick-current {
        border : 1px solid;
      }
      >div{
    background: rgba(255,255,255,.7);
    margin: 1px 1px 0;
        max-width: 190px;
        max-height: 61px;
        >div {
         width: 100%;
         height: 100%;
        }
        img{
        width: 100%;
        height: 100%;
        }
      }
    }
  }
`;
const Text = styled(SS.Core.Text)`
  display: flex;
  align-items: center;
  margin : 0 0 10px 0;
  padding : 0 0 0 10px;
  font-size : 1.2em;
  position : relative;
  min-height: 22px;
  &::after{
    content : "";
    position : absolute;
    width : 4px;
    height : 100%;
    left : 0;
    top : 0;
    transform: translateX(50%);
    border-radius: 3px;
    background-color: ${theme.pink};
  }
`;

interface IProps {
    name?: string
    maxWidth?: string
    main?: boolean
    height?: string
    imgBoxWidth?: string
    bgColor?: string
    margin?: string,
    slider?: boolean
    banner?: any
    saraStory?: any
}


const BannerLayout: React.FunctionComponent<IProps> = ({
                                                           slider,
                                                           children, main,
                                                           height,
                                                           maxWidth,
                                                           imgBoxWidth,
                                                           bgColor,
                                                           name,
                                                           margin,
                                                           banner,
                                                           saraStory
                                                       }) => {

    return (
        <SS.Core.Container>
            <SS.Core.Col>
                {main ?
                    <>
                        <BasicLayout main={main} slider={slider} name={name} height={height} maxWidth={maxWidth}
                                     bgColor={bgColor}
                                     margin={margin}
                                     saraStory={saraStory}
                                     banner={banner}
                                     children={children}/>
                    </>

                    :
                    <BasicLayout name={name} height={height} banner={banner} children={children}/>
                }
            </SS.Core.Col>
        </SS.Core.Container>
    );
};
const BasicLayout: React.FunctionComponent<IProps> = ({
                                                          slider,
                                                          main,
                                                          name,
                                                          children,
                                                          height,
                                                          maxWidth,
                                                          imgBoxWidth,
                                                          bgColor,
                                                          margin,
                                                          banner,
                                                          saraStory
                                                      }) => {

    if (height === "70px" || height === "75px" || !height) {
        imgBoxWidth = "100%";
    } else {
        height = "425px"
    }
    console.log("layout에 있는 -- banner", banner)
    return (
        <Row style={{position: "relative"}}>
            <Col height={height}>
                <Text>
                    {name} 사진<SS.Core.Button padding={"2px"} margin={"0 0 0 5px"}
                                             theme={banner?.img || !banner ? theme.pink : theme.purple}>{banner?.img || !banner ? "적용중" : "미적용중"}</SS.Core.Button>
                </Text>
                {slider ?
                    (saraStory ? <SaracenStoryBanner stories={saraStory}/> : null) :
                    <SS.Core.Col
                        style={{
                            alignItems: "center",
                            height: height,
                            width: imgBoxWidth ? imgBoxWidth : "100%",
                            backgroundColor: bgColor
                        }}>
                        <img style={{height: "100%", width: "auto"}}
                             src={`
                             ${banner?.type === "app_splash_image"
                                 ? process.env.REACT_APP_ACTIVE_IMG + "img/app/splash"
                                 : process.env.REACT_APP_SARACEN_IMG + "img/banner/image/" + banner?.relationId}/${banner?.img}`}/>
                    </SS.Core.Col>}
            </Col>
            {children}
        </Row>
    )
}
export default BannerLayout;
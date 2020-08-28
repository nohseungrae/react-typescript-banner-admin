import React, {JSXElementConstructor, ReactElement, useContext, useEffect, useRef, useState} from 'react';
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface SProps {
    height?: string
}

const Row = styled(SS.Core.Row)`
  overflow: hidden;
  border-radius: 5px;
  width : 100%;
  > img {
  width : 100%;
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
    margin?: string
}

const BannerLayout: React.FunctionComponent<IProps> = ({
                                                           children, main,
                                                           height,
                                                           maxWidth,
                                                           imgBoxWidth,
                                                           bgColor,
                                                           name,
                                                           margin
                                                       }) => {

    const BasicLayout: React.FunctionComponent<IProps> = ({
                                                              main,
                                                              name,
                                                              children,
                                                              height,
                                                              maxWidth,
                                                              imgBoxWidth,
                                                              bgColor,
                                                              margin
                                                          }) => {
        if (height === "70px" || height === "500px") {
            imgBoxWidth = "fit-content"
        }

        const [state, setState] = useState<{ nav1: Slider | undefined, nav2: Slider | undefined }>({
            nav1: undefined,
            nav2: undefined
        })

        let slider1: Slider;
        let slider2: Slider;
        useEffect(() => {
            setState({
                ...state,
                nav1: slider1,
                nav2: slider2
            })
        }, [])

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            pauseOnHover: true
        }

        return (
            <SS.Core.Row style={{position : "relative"}}>
                <Col height={height}>
                    <Text>
                        {name} 사진<SS.Core.Button padding={"2px"} margin={"0 0 0 5px"}
                                                 theme={theme.pink}>적용중</SS.Core.Button>
                    </Text>
                    <SS.Core.Col
                        style={{
                            alignItems: "center",
                            height: height,
                            width: imgBoxWidth ? imgBoxWidth : "100%",
                            backgroundColor: bgColor,
                        }}>
                        {margin ?
                            <SS.Core.Row style={{position: "relative", maxWidth: "1150px"}}>
                                <SS.Core.Col style={{height: "100%", margin: margin, maxWidth: "960px"}}>
                                    <Slider asNavFor={state.nav2}
                                            ref={(slider: Slider) => slider1 = slider} {...settings}>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/32dac0618508aecc93800620f9ddc5a8.jpg"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/e65ace4b9c341ada199ce38090998e6d.jpg"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/7ab399c6120ed92cf0ea8294e3ea0f1d.jpg"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/7c15ebc60160e5006eae168869ab1351.jpg"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/7c15ebc60160e5006eae168869ab1351.jpg"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/7c15ebc60160e5006eae168869ab1351.jpg"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/7c15ebc60160e5006eae168869ab1351.jpg"}/>
                                        </div>
                                    </Slider>

                                </SS.Core.Col>
                                <SS.Core.Col className={"mini-banners"}>
                                    <Slider asNavFor={state?.nav1}
                                            ref={(slider: Slider) => slider2 = slider} slidesToShow={7} vertical={true}
                                            focusOnSelect={true}>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                        <div>
                                            <img style={{height: "100%", maxWidth: maxWidth}}
                                                 src={"https://saracen.azureedge.net/img/banner/image/0/5aa0433557a30fc6acda37a0adfc8ce6.png"}/>
                                        </div>
                                    </Slider>
                                </SS.Core.Col>
                            </SS.Core.Row>
                            :
                            <img style={{ maxWidth: maxWidth}}
                                 src={"https://saracen.azureedge.net/img/banner/image/0/edd57fd9b06b654fc2461612734f5c44.jpg"}/>
                        }

                    </SS.Core.Col>
                </Col>
                {children}
            </SS.Core.Row>
        )
    }

    return (
        <SS.Core.Container>
            <SS.Core.Inner>
                {main ?
                    <>
                        <BasicLayout main={main} name={name} height={height} maxWidth={maxWidth} bgColor={bgColor}
                                     margin={margin}
                                     children={children}/>
                    </>

                    :
                    <BasicLayout name={name} height={height} children={children}/>
                }
            </SS.Core.Inner>
        </SS.Core.Container>
    );
};

export default BannerLayout;
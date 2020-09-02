import React from 'react';
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import Stories from "./Slider/Stories";

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
}

const BasicLayout: React.FunctionComponent<IProps> = ({
                                                          slider,
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

    return (
        <Row style={{position: "relative"}}>
            <Col height={height}>
                <Text>
                    {name} 사진<SS.Core.Button padding={"2px"} margin={"0 0 0 5px"}
                                             theme={theme.pink}>적용중</SS.Core.Button>
                </Text>
                {slider ?
                    <Stories stories={
                        [
                            {
                                admin_id: 0,
                                alt: "도전! 9월의 구매왕",
                                back_img: null,
                                back_img_pos: null,
                                color: "#fecf5f",
                                created_at: "2020-09-01 00:00:01",
                                id: 848,
                                img: "8eaeba06617d04f39709078d0368bf22.jpg",
                                main_copy: "도전! 9월의 구매왕",
                                mini_img: null,
                                relation_id: 1598862270,
                                seq: 0,
                                sub_copy: "9월 구매왕에 도전하라!",
                                type: "sara_story",
                                updated_at: "2020-09-01 00:00:01",
                                url: "https://thesaracen.com/event/detail/1567"
                            },
                            {
                                admin_id: 0,
                                alt: "떳다! 이주의 신상",
                                back_img: null,
                                back_img_pos: null,
                                color: "#ff8b00",
                                created_at: "2020-07-21 00:00:02",
                                id: 805,
                                img: "5843b2522c1c8345323279748cfe6143.jpg",
                                main_copy: "떳다! 이주의 신상",
                                mini_img: null,
                                relation_id: 1595237874,
                                seq: 1,
                                sub_copy: "지금 HOT한 신상들을 만나보세요♥",
                                type: "sara_story",
                                updated_at: "2020-08-25 10:12:01",
                                url: "https://thesaracen.com/event/detail/1502",
                            },
                            {
                                admin_id: 0,
                                alt: "가을을 부탁해! 2020 가을 신상 컬러젤",
                                back_img: null,
                                back_img_pos: null,
                                color: "#e9cba7",
                                created_at: "2020-08-21 18:21:25",
                                id: 836,
                                img: "6d4ff128887890fec4f4ba040a2ea4dc.jpg",
                                main_copy: "가을을 부탁해! 2020 가을 신상 컬러젤",
                                mini_img: null,
                                relation_id: 1598001441,
                                seq: 1,
                                sub_copy: "",
                                type: "sara_story",
                                updated_at: "2020-09-01 17:49:45",
                                url: "https://thesaracen.com/event/detail/1578"
                            },
                            {
                                admin_id: 0,
                                alt: "[그라시아] 진비 아이비 발레리나 6종 세트",
                                back_img: null,
                                back_img_pos: null,
                                color: "#b9c2e3",
                                created_at: "2020-08-26 11:36:08",
                                id: 840,
                                img: "ce59a8723e7e47304dcafc9d5e504ae6.jpg",
                                main_copy: "[그라시아] 진비 아이비 발레리나 6종 세트",
                                mini_img: null,
                                relation_id: 1598409251,
                                seq: 2,
                                sub_copy: "#컬러젤 #글리터젤 #핑크 #골드 #여리 #반짝",
                                type: "sara_story",
                                updated_at: "2020-09-01 16:00:44",
                                url: "https://thesaracen.com/goods/218396"
                            }
                        ]
                    }/> :
                    <SS.Core.Col
                        style={{
                            alignItems: "center",
                            height: height,
                            width: imgBoxWidth ? imgBoxWidth : "100%",
                            backgroundColor: bgColor
                        }}
                    />}
            </Col>
            {children}
        </Row>
    )
}
const BannerLayout: React.FunctionComponent<IProps> = ({
                                                           slider,
                                                           children, main,
                                                           height,
                                                           maxWidth,
                                                           imgBoxWidth,
                                                           bgColor,
                                                           name,
                                                           margin
                                                       }) => {

    return (
        <SS.Core.Container>
            <SS.Core.Inner>
                {main ?
                    <>
                        <BasicLayout main={main} slider={slider} name={name} height={height} maxWidth={maxWidth}
                                     bgColor={bgColor}
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
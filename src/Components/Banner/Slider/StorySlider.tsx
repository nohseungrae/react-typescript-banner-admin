import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import Slider from "react-slick";
import styled, {keyframes} from 'styled-components'
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';


interface SProps {
    display?: string
    bgColor?: string
    displayurl?: string
    width?: string
    bar?: string
    color?: string
    main_copy?: string
    sub_copy?: string
    key?: number
    ani?: string
    href?: string
    value?: string | number
    zIndex?: string
    src?: string
    alt?: string
    onChange?: any
    stories?: any
    CloseStory?: any
    index?: any
}

const StoryContainer = styled.div<SProps>`
  display: ${props => props.display};
  top: 0;
  left : 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100000;
  transition: all 2s ease-in-out;
    .story {
    display: block;
    overflow-x: auto;
    width: 100%;
    .sara_story_1 {
      display: flex;
      width: max-content;
      li {
        width: 200px;
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
  .slick-slider > .slick-list {
    position: relative;
    display: block;
  }
  .slick-slider {
    width : 100%;
    height: 100%;
    display: flex !important;
    position: relative;
    z-index: 400;
    overflow-y: hidden;
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
  }
  .slick-list {
    max-width: 642px;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
  .slick-next, .slick-prev {
    font-size: 0;
    line-height: 0;
    display: block;
    cursor: pointer;
    border: none;
  }
  .slick-next:hover svg, .slick-prev:hover svg{
      transition: linear .2s;
      color : #ffffff !important;
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }

  .slick-initialized .slick-slide {
    display: block;
    width: 100%;
    position : relative;
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    
    > div {
    height: 100%;
    }
  }
  .close {
    cursor: pointer;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    opacity: 1;
    z-index: 999;
    margin : 5px 0 0 5px;
    &:before, &:after {
        position: absolute;
        left: 50%;
        top: 25%;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #fff;
        box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.16);
      }
    &:before {
        transform: rotate(45deg);
      }
    &:after {
        transform: rotate(-45deg);
      }
    }
`;
const Logo = styled.div`
    position: absolute;
    top: 0;
    left: 65px;
    z-index: 10;
    background : url("https://saracen.azureedge.net/img/banner/image/0/edd57fd9b06b654fc2461612734f5c44.jpg") no-repeat center center;
    width : 250px;
    height : 70px;
`;

const StoryBox = styled.div`
display: flex;
  height: 100%;
  background-color: #000000db;
`;
const LeftSide = styled.div`
width : 360px;
height : 100%;
background-color: black;
position: relative;
  .side_stories_box { 
    position : fixed;
    top : 70px;
    bottom : 0;
    width: inherit;
    margin : 10px 0 0 0;
    padding : 5px;
      .side_stories_content{
        width :100%;
        height : 100%;
        .slick-track{
          display: flex;
          flex-flow: column nowrap;
          height : auto !important;
        }
        .slick-current .item_wrap{
          background-color: #ffffff1A;
        }
        .side_items {
          padding : 2px;
          .side_item{
            padding : 2px;
            color : #ffffff;
            .item_wrap {
              border-radius: 6px;
              margin : 0 5px;
              padding : 8px;
              display : flex;
              .item_left {
                margin-right : 10px;
                >div { margin : 2px ;width : 60px;height: 60px; overflow: hidden; border-radius: 50%;}
                img {width : 100%;height: 100%;object-fit: cover;}
              }
              .item_right {
                width : 100%;
                display: flex;
                align-items: center;
                > div {
                  display : flex;
                  flex-direction: column;
                  flex-grow: 1;
                  > div:last-child span {
                    font-size : 12px;
                  }
                }
              }
            }
          }
        }  
      }
  }
`;
const SpanBox = styled.div`
    padding : 2px 0;
    display : inline-block;
    span {
      font-size : 14px;
    }
`;
const TopSide = styled.div`
position : absolute;
left: 0;
top : 0;
width: 100%;
height: 70px;
`;
const RightSide = styled.div`
position : relative;
width: calc(100% - 360px);
`;
const Open = keyframes`
  0% {
    transform: scale(0.2);
    opacity: 0; 
  }
  
  20%{
    transform: scale(0.2);
    opacity: 0; 
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`

const StoryItem = styled.div<SProps>`
    background-size: auto 100%;
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
    background: ${props => props.bgColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 997;
    animation: ${Open} 0.3s ease-in-out;
    
    & .story_img{
      width: 100%;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center;
    & img{
        width: 100%;
      }
    .overlay{
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 997;
        background: url(${process.env.REACT_APP_ABSOLUTE_HOST + "static/m/images/story_overlay.png"}) repeat-x;
        background-size: auto 100%;
      }
    }    
`

const Title = keyframes`
  from {
    transform: translate(0, -120px);
    opacity: 0;
  }
  50% {
    transform: translate(0, -40px);
    opacity: 0;  
  }
  to{
    margin-bottom: 60px;
    opacity: 1;
  }
`

const Links = keyframes`
  from {
    transform: translate(0, 100px);
    opacity: 0;
  }
  to{
    transform: translate(0, 0);
    opacity: 1;
  }
`
const Heart = keyframes`
  from {
    transform: translate(50%,100px);
    opacity: 0;
  }
  to{
    transform: translate(50%, 0);
    opacity: 1;
  }
`

const StoryFooter = styled.div`
    position: absolute;
    bottom: 50px;
    width: 100%;
    z-index: 999;
`

const StoryTitle = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-bottom: 60px;
    padding: 0 15px;
    color: #fff;
    transition: margin-bottom, opacity 0.5s linear;
    &.animation{
      animation: ${Title} 0.7s linear;
    }
    > h2{
      color: #fff;
      font-size: 1.8em;
    }
    > span{
      margin: 5px 0;
      color: #ececec;
      font-size: 1em;
    }
`

const StoryLink = styled.div`
   transition: margin-bottom, opacity .5s ease-out;
   height: 80px;
   &.animation{
    animation: ${Links} 0.5s ease-out;
   }
`

const A = styled.a<SProps>`
    display: ${props => props.displayurl ?? 'flex'};
    align-items: center;
    flex-flow: column wrap;
    text-decoration: none;
    > span{
      padding: 5px 25px;
      border-radius: 0.3em;
      margin: 0 auto;
      color: white;
      text-decoration: none;
      border: 1px solid white;
    }
    > img{
      width: 45px;
      height: 45px;
      padding: 7px;
    }
`

const StoryHeart = styled.div`
    cursor: pointer;
    //border-left: 1px solid #eaeaea;
    position: absolute;
    bottom: 60px;
    right: 5%;
    width: 55px;
    height: 30px;
    z-index: 1000;
    transform: translate(50%, 0);
    animation: ${Heart} linear .5s;
    & .heartBtn {
      font-size: 2em;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      > img {     
        width: 34px;
        height: auto;
      }
    }
    
    .animation-icon {
      position: absolute;
      left: 50%;
      bottom: calc(50% - 12px);
      transform: translateX(-50%);
      transition: .8s;
      opacity: 1;
    
      &.animate {
        font-size: 50px;
        opacity: 0;
        vertical-align: bottom;
        bottom: 100px;
      }
    }
`
const ProgressContainer = styled.div<SProps>`
  width: ${props => props.width ?? "100%"};
  display: ${props => props.display};
  margin: 0 auto;
  overflow: hidden;
  height: 5px;
  background-color: rgba(245, 245, 246, 0.3);
  border-radius: 1em;
  line-height: .625em;
  box-shadow: inset 0 0.1rem 0.1rem rgba(90,97,105,.15);
  position: absolute;
  top: 7px;
  left: 0;
  z-index: 999;
`;

const Move = keyframes`
  from { width: 0; }
  to { width: 100%;}
`

const ProgressBar = styled.div<SProps>`
  height: 5px;
  line-height: 5px;
  border-radius: 1em;
  width: ${props => props.bar};
  background-color: white;
  transition: width 0.1s ease;
  animation: ${Move} 6s ease-in-out;
`;

const Progress: React.FunctionComponent<SProps> = ({width, display, bar}) => (
    <>
        <ProgressContainer width={width} display={display} className={"progress_container"}>
            <ProgressBar bar={bar + "%"}/>
        </ProgressContainer>
    </>
)

const NextArrow = ({className, style, onClick}: any) => {
    return (
        <div className={className} style={{
            ...style, position: "relative", flexGrow: 1, height: "100%"
        }} onClick={onClick}>
            <ArrowForwardIosSharpIcon style={{
                color: "gray",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}/>
        </div>

    )
}

const PrevArrow = ({className, style, onClick}: any) => {
    return (
        <div
            className={className}
            style={{
                ...style, position: "relative", flexGrow: 1, height: "100%"
            }} onClick={onClick}
        >
            <ArrowBackIosSharpIcon style={{
                color: "gray",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }}/>
        </div>
    );
}

const usePrevValues = (value: any, callback: Function) => {
    const prevValues = useRef(value);

    useEffect(() => {
        callback(prevValues.current);
        return () => (prevValues.current = value);
    }, [value, callback]);
};

const StorySlider: React.FunctionComponent<SProps> = ({stories, CloseStory, display, index}: any) => {

    console.log(display)
    const [storyState, setStoryState] = useState({
        slideIndex: 0,
        stories: stories,
        heartIndex: []
    })
    const [state, setState] = useState<{ nav1: Slider | undefined, nav2: Slider | undefined }>({
        nav1: undefined,
        nav2: undefined
    })

    let slider: Slider;
    let subSlide: Slider;

    const handleSlideIndex = ({target: {value}}: any) => {
        console.log(value, "slider handleSlideindex")
        const parsedVal = parseInt(value);
        slider?.slickGoTo(parsedVal)
        if (value !== '') {
            setStoryState({
                ...storyState,
                slideIndex: parsedVal
            })
        }
    }

    const handleAddHeart = (e: any, i: number) => {
        e.preventDefault();
        const {target} = e;
        const heartBtn = target.parentElement;
        let cloneIcon = target.cloneNode();

        cloneIcon.classList.add('animation-icon');
        target.setAttribute('src', `${process.env.REACT_APP_ABSOLUTE_HOST}static/icons/ico_heart_on.png`);
        cloneIcon.setAttribute('src', `${process.env.REACT_APP_ABSOLUTE_HOST}static/icons/ico_heart_on.png`);

        heartBtn.insertAdjacentElement('beforeend', cloneIcon);

        setTimeout(function () {
            cloneIcon.classList.add('animate');
            cloneIcon.style.left = (80 * Math.random()) + 'px';
        }, 50);

        setTimeout(() => cloneIcon.parentNode.removeChild(cloneIcon), 600)

        // TODO : Rest JS로 하트 하기

    }

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false
        ,
        speed: 300,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        beforeChange: (current: any, next: any) => setStoryState({...storyState, slideIndex: next})
    };


    usePrevValues(
        useMemo(() => (index), [index]),
        useCallback((prevValues: any) => {
            setState({
                nav1: slider,
                nav2: subSlide
            })
            if (prevValues === index) {
                console.log("callback invoked", prevValues, index);
                const parsedIndex = parseInt(index);
                slider?.slickGoTo(parsedIndex)
            } else {
                console.log("callback", prevValues, index);
                const parsedIndex = parseInt(index);
                slider?.slickGoTo(parsedIndex)
            }
        }, [index])
    );

    return (
        <StoryContainer display={display}>
            <div className="close" onClick={CloseStory}></div>
            <Logo></Logo>
            <StoryBox>
                <LeftSide>
                    <div className={"side_stories_box"}>
                        <div className={"side_stories_content"}>
                            <Slider asNavFor={state?.nav1} ref={(slider: Slider) => subSlide = slider}
                                    slidesToShow={4} vertical={true}
                                    speed={300}
                                    focusOnSelect={true} className={"side_items"}>
                                {
                                    stories.map((story: any, i: number) => {
                                        return (
                                            <div key={i} className={"side_item"}>
                                                <div className={"item_wrap"}>
                                                    <div className={"item_left"}>
                                                        <div>
                                                            <img
                                                                src={`${process.env.REACT_APP_ACTIVE_IMG}/img/banner/image/${story.relation_id}/${story.img}`}/>
                                                        </div>
                                                    </div>
                                                    <div className={"item_right"}>
                                                        <div>
                                                            <SpanBox>
                                                                <span>{story.main_copy}</span>
                                                            </SpanBox>
                                                            <SpanBox>
                                                                <span>{story.sub_copy}</span>
                                                            </SpanBox>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </LeftSide>
                <TopSide/>
                <RightSide>
                    <Slider asNavFor={state.nav2} {...settings} ref={(slide: Slider) => slider = slide}>
                        {stories.map((story: any, i: number) =>
                            <React.Fragment key={i}>
                                <Story
                                    color={story.color}
                                    main_copy={story.main_copy}
                                    sub_copy={story.sub_copy}
                                    src={`${process.env.REACT_APP_ACTIVE_IMG}img/banner/image/${story.relation_id}/${story.img}`}
                                    alt={story.alt}
                                    href={story.url}
                                    value={storyState.slideIndex}
                                    onChange={(e: any) => handleSlideIndex(e)}
                                    bar={i === storyState.slideIndex ? '100' : '0'}
                                    display={i === storyState.slideIndex ? 'block' : 'none'}
                                    ani={i === storyState.slideIndex ? 'animation' : ''}
                                    displayurl={story.url === null || story.url === '' ? 'none' : 'flex'}
                                >

                                </Story>
                                <StoryHeart onClick={e => handleAddHeart(e, i)}
                                            style={{display: i === storyState.slideIndex ? 'block' : 'none'}}>
                                    <div className='heartBtn'>
                                        <img
                                            src={`${process.env.REACT_APP_ABSOLUTE_HOST}static/icons/ico_heart_off.png`}
                                            alt='하트버튼'/>
                                        <span></span>
                                    </div>
                                </StoryHeart>
                            </React.Fragment>
                        )}
                    </Slider>
                </RightSide>


            </StoryBox>

        </StoryContainer>
    )
}

const Story: React.FunctionComponent<SProps> = (props) => (
    <>
        <StoryItem bgColor={props.color} key={props.key}>
            <input onChange={props.onChange}
                   value={props.value}
                   type="text"
                   placeholder='0'
                   style={{width: '100%', position: 'absolute', zIndex: 1, height: '20px', display: 'none'}}
            />
            <Progress bar={props.bar} display={props.display}/>
            <StoryFooter>
                <StoryTitle className={props.ani}>
                    <h2>{props.main_copy}</h2>
                    <span>{props.sub_copy}</span>
                </StoryTitle>
                <StoryLink className={props.ani}>
                    <A href={props.href} displayurl={props.displayurl}>
                        <img src={`${process.env.REACT_APP_ABSOLUTE_HOST}static/icons/ico_circle_arrow_up.png`}
                             alt='화살표아이콘'/>
                        <span>자세히보기</span>
                    </A>
                </StoryLink>
            </StoryFooter>
            <div className="story_img">
                <div className="overlay"/>
                <img src={props.src} alt={props.alt}/>
            </div>
        </StoryItem>
    </>
)
export default StorySlider;
import React, {Component, useEffect, useMemo, useRef, useState} from 'react'
import Slider from "react-slick";
import styled, {keyframes} from 'styled-components'

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
    value?: string
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
  .close {
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 3px;
    width: 50px;
    height: 50px;
    opacity: 1;
    z-index: 999;
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
        background: url(${process.env.REACT_APP_BACKEND_HOST + "static/m/images/story_overlay.png"}) repeat-x;
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
    margin-bottom: 10px;
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

const StoryFooter = styled.div`
    position: absolute;
    bottom: 10px;
    width: 100%;
    z-index: 999;
`

const StoryTitle = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-bottom: 10px;
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
    border-left: 1px solid #eaeaea;
    position: absolute;
    bottom: 9px;
    right: 0;
    width: 55px;
    height: 30px;
    z-index: 450;
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
  animation: ${Move} 6.7s ease-in-out;
`;

const Progress: React.FunctionComponent<SProps> = ({width, display, bar}) => (
    <>
        <ProgressContainer width={width} display={display}>
            <ProgressBar bar={bar + "%"}/>
        </ProgressContainer>
    </>
)

const NextArrow = ({className, style, onClick}: any) => {
    return (
        <div
            className={className}
            style={{
                ...style, display: "flex", background: "red", position: "absolute",
                justifyContent: 'center', alignItems: 'center', right: 0, top: '50%',
                width: '120px', height: '80%', opacity: '0'
            }}
            onClick={onClick}
        />
    )
}

const PrevArrow = ({className, style, onClick}: any) => {
    return (
        <div
            className={className}
            style={{
                ...style, display: "flex", background: "green", position: "absolute",
                justifyContent: 'center', alignItems: 'center', left: 0, top: '50%', zIndex: '10',
                width: '120px', height: '80%', opacity: '0'
            }}
            onClick={onClick}
        />
    );
}

const usePrevValues = (value: any, callback: Function) => {
    const prevValues = useRef(value);

    useEffect(() => {
        callback(prevValues.current);
        return () => (prevValues.current = value);
    }, [value, callback]);
};

const StorySlider: React.FunctionComponent<SProps> = ({stories, CloseStory, display, slideIndex, index}: any) => {

    const [storyState, setStoryState] = useState({
        slideIndex: 0,
        stories: stories,
        heartIndex: []
    })

    let slider: Slider;
    const handleSlideIndex = ({target: {value}}: any) => {
        const parsedVal = parseInt(value);
        slider.slickGoTo(parsedVal)
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
        target.setAttribute('src', `${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_heart_on.png`);
        cloneIcon.setAttribute('src', `${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_heart_on.png`);

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
        autoplay: true,
        speed: 300,
        autoplaySpeed: 6700,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        beforeChange: (current: any, next: any) => setStoryState({...storyState, slideIndex: next})
    };


    // usePrevValues(
    //     useMemo(() => ({
    //         count,
    //         upperCount
    //     }), [count, upperCount]),
    //     useCallback(prevValues => {
    //         console.log("callback invoked");
    //         if (prevValues.count + 1 === count) {
    //             console.log("inner done");
    //         }
    //
    //         if (prevValues.upperCount + 1 === upperCount) {
    //             console.log("outer done");
    //         }
    //     }, [count, upperCount])
    // );

    // componentDidUpdate (prevProps, prevState) {
    //     if(prevProps.index !== this.props.index) {
    //         const parsedIndex = parseInt(this.props.index);
    //         this.slider.slickGoTo(parsedIndex)
    //         this.setState({
    //             slideIndex: parsedIndex
    //         })
    //     } else {
    //         const parsedIndex = parseInt(this.props.index);
    //         this.slider.slickGoTo(parsedIndex)
    //     }
    // }
    return (
        <StoryContainer display={display}>
            <div className="close" onClick={CloseStory}/>
            {stories.map((story: any, i: number) =>
                <StoryHeart onClick={e => handleAddHeart(e, i)}
                            style={{display: i === slideIndex ? 'block' : 'none'}} key={i}>
                    <div className='heartBtn'>
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_heart_off.png`} alt='하트버튼'/>
                        <span></span>
                    </div>
                </StoryHeart>
            )}
            <Slider {...settings} ref={(slider: Slider) => slider = slider}>
                {stories.map((story: any, i: number) =>
                    <Story
                        key={i}
                        color={story.color}
                        main_copy={story.main_copy}
                        sub_copy={story.sub_copy}
                        src={`${process.env.REACT_APP_ACTIVE_IMG}img/banner/image/${story.relation_id}/${story.img}`}
                        alt={story.alt}
                        href={story.url}
                        value={slideIndex}
                        onChange={(e: any) => handleSlideIndex(e)}
                        bar={i === slideIndex ? '100' : '0'}
                        display={i === slideIndex ? 'block' : 'none'}
                        ani={i === slideIndex ? 'animation' : ''}
                        displayurl={story.url === null || story.url === '' ? 'none' : 'flex'}
                    />
                )}
            </Slider>
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
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_circle_arrow_up.png`}
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
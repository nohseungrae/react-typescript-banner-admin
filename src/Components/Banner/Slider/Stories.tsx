import React, {useEffect, useState} from 'react'
import StorySlider from './StorySlider'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import {DataUtil} from 'src/Components/Banner/Slider/DataUtil';

interface IProps {
    stories?: any
}

const Stories: React.FunctionComponent<IProps> = (props) => {

    const {stories} = props;
    const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);

    const [state, setState] = useState({
        displayState: "none",
        slides: "",
        index: 0,
        stores: stories,
        groupedStories: DataUtil.jsonListGroupBy(stories, 'seq').map((item: any) => item.sort(
            () => {
                return Math.random() - Math.random();
            }
        )).flatMap((item: any) => item),
        targetElement: null
    })


    const handleOpenStory = (e: any, i: number) => {
        e.preventDefault();
        const parsedIndex = i;
        const body: HTMLBodyElement | null = document.querySelector('body') as HTMLBodyElement;
        console.log(body);
        body.style.overflowY = 'hidden';
        setState({
            ...state,
            displayState: 'block',
            index: parsedIndex
        })
        disableBodyScroll(targetEl as HTMLElement)
    }

    const handleCloseStory = () => {
        const body: HTMLElement | null = document.querySelector('body') as HTMLBodyElement;
        body.style.overflowY = 'auto'
        setState({
            ...state,
            displayState: 'none'
        })
        enableBodyScroll(targetEl as HTMLElement);
    }
    useEffect(() => {
        setTargetEl(document.querySelector('body') as HTMLBodyElement);
        return () => clearAllBodyScrollLocks();
    }, [targetEl])
    return (
        <>
            <StorySlider
                stories={state.groupedStories}
                CloseStory={handleCloseStory}
                display={state.displayState}
                index={state.index}
            />
            <div className="story">
                <ul className="sara_story_1" style={{padding : "0"}}>
                    {state.groupedStories.map((story: any, i) =>
                        <li className="js_story" key={i} onClick={e => handleOpenStory(e, i)}>
                            <span>{story.alt}</span>
                            <img className="overlay"
                                 src={`${process.env.REACT_APP_ABSOLUTE_HOST}static/m/images/story_overlay.png`}
                                 alt='overlay'/>
                            <img
                                src={`${process.env.REACT_APP_ACTIVE_IMG}img/banner/image/${story.relation_id}/${story.img}`}
                                alt={story.alt}/>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}
export default Stories

import React from "react"
import { navigate } from 'gatsby'
import Header from '../components/header.js';
import {
  goToChapterControl,
  container,
  videoWrapper,
  controlsWrapper,
  togglePlayPause } from "./film.module.css";
import {  MdPause, MdPlayArrow, } from 'react-icons/md';
import VideoPlayer from "../components/videoPlayer.js";
import fetchAPI from '../components/fetchREST.js';
import Loading from '../components/loading.js'

function Chapter(props) {
  return (
    <button 
      className={goToChapterControl} onClick={ (e) => props.onClickChapter(props.target, e) }>{props.label}</button>
  )
}

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      playTime: 0,
      filmURL : null, 
      chapterList: null,
      subtitles: null,
      apiFetched: false
    };
  }

  handlePause() {
    this.setState({ playing: false });
  }

  handlePlay() {
    this.setState({ playing: true });
  }

  handleEnd() {
    setTimeout(() => navigate('/'), 2500 );
  }

  togglePlay() {
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  getChapterArray() {
    const chapterTargetArray = [];
    for (let chapter of this.state.chapterList) {
      chapterTargetArray.push(chapter.second);
    }
    return chapterTargetArray
  }

  handlePrev(currentTime) {
    const chapterTargetArray = this.getChapterArray();
    // behaves just like audio CD player: 
    // one click goes to the begining of the actual chapter, 
    // a second click within the first second at the begining of the chapter, goes to the begining of the previous chapter
    let prevChapter = Math.max(...chapterTargetArray.filter( target => target <= currentTime - 1)); 
    if (prevChapter < 0) {prevChapter = 1};//prevent from setting a negative target playTime
    //problem: the state often allready has this value (set by chapter button click or next onscreen button). So the player component is not reloaded with a new play Value. 
    this.setState({playTime: prevChapter - Math.random()});//Dirty solution is to change a little bit the value with random()
  }

  handleNext(currentTime) {
    const chapterTargetArray = this.getChapterArray();
    let nextChapter = Math.min(...chapterTargetArray.filter( target => target >= currentTime ));
    if (nextChapter > Math.max(...chapterTargetArray)) {return};//prevent from setting target playTime after the last chapter
    this.setState({playTime: nextChapter})
  }


  renderChapters(chapterList) {
    let chaptersRendered = [];
    for (const chapter of chapterList) {
      chaptersRendered.push(<Chapter key = {chapter.id} label= {chapter.label} target = {chapter.second} onClickChapter = {(i) => this.handleChapterClick(i)} />)
    };
    return ( chaptersRendered )
  }

  handleChapterClick(i) {
    this.setState({playTime: i})
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    this.setState({isMounted : true,});
    fetchAPI('film').then( film => {
      film.chapitres.sort((a, b) => a.second - b.second);// sort the array of chapters with ascending seconds
      const subtitleList = film.soustitres.map(sub => {
        let subtitle = {
          id: sub.id,
          lang: sub.langue,
          src: process.env.GATSBY_API_URL + sub.fichier.url,
          default: sub.default,
        }; 
        return subtitle;
      });
      this.setState({
        filmURL : process.env.GATSBY_API_URL + film.video.url, 
        chapterList: film.chapitres,
        subtitles: subtitleList,
        apiFetched: true
      });
      //firsts renders are without this state, if too fast, it's flashing: bad sensation: better waiting a bit
      //setTimeout(() => this.setState({stepsData : apiSteps , apiFetched: true}), 800 )
    }); 
  }


  
  render() {
    const chapters = this.state.apiFetched ?  this.renderChapters(this.state.chapterList) : <div/>;
    return (
        <div className={container} >
          <Header />
          <div className={videoWrapper}>
            { this.state.apiFetched ? 
              <VideoPlayer
                autoplay = {true}
                type = {'video/mp4'}
                src={this.state.filmURL}
                subtitles = {this.state.subtitles}//needs [{id: 'xx', lang: 'fr', src: videoFrSubtitleFR, default: true}, {id: 'xx', lang: 'en', src: videoFrSubtitleEN}]
                playTime = {this.state.playTime}
                onPause={() => this.handlePause() }
                onPlay={() => this.handlePlay() }
                onEnded={() => this.handleEnd() }
                onPrev={(currentTime) => this.handlePrev(currentTime) }
                onNext={(currentTime) => this.handleNext(currentTime) }
                play = {this.state.playing}
              />
              :
              <Loading/>
             }
          </div>
          <div className={controlsWrapper}>
            <button 
              className = {togglePlayPause}
              //tabIndex={0} onKeyDown={(e) => this.handleKeyDown(e)} //needs focus to work properly. Useless in touch screens interactivity
              onClick={() => this.togglePlay()}>
                {this.state.playing ? <MdPause size='1.5x' length= '1.5x'/> : <MdPlayArrow size='1.5x' length= '1.5x'/> }
            </button>
            {this.state.playing? <div/> : chapters }
          </div> 
      </div>
    )
  };
};

export default Film
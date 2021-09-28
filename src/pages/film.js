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
import videoFile from '../video/pressagev2.4.mp4';
import videoFrSubtitleFR from '../video/pressageFR.vtt';
import videoFrSubtitleEN from '../video/pressageEN.vtt';
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
      substitles: null,
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


  renderChapters(chapterList) {
    let chaptersRendered = [];
    for (const chapter of chapterList) {
      chaptersRendered.push(<Chapter key = {chapter.id} label= {chapter.label} target = {chapter.second} onClickChapter = {(i) => this.handleChapterClick(i)} />)
    };
    return ( chaptersRendered )
  }

  handleChapterClick(i) {
    this.setState({playTime: i})
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    this.setState({isMounted : true,});
    fetchAPI('film').then( film => {
      film.film_chapters.sort((a, b) => a.second - b.second);// sort the array of chapters with ascending seconds
      const subtitleList = film.film_subtitles.map(sub => {
        let subtitle = {
          id: sub.id,
          lang: sub.langue,
          src: process.env.GATSBY_API_URL + sub.fichier.url,
          default: sub.default,
        }; 
        return subtitle;
      })
      this.setState({
        filmURL : process.env.GATSBY_API_URL + film.video.url, 
        chapterList: film.film_chapters,
        substitles: subtitleList,
        apiFetched: true
      });
      //firsts renders are without this state, if too fast, it's flashing: bad sensation: better waiting a bit
      //setTimeout(() => this.setState({stepsData : apiSteps , apiFetched: true}), 800 )
    }); 
  }


  
  render() {
    const chapters = this.state.apiFetched ?  this.renderChapters(this.state.chapterList) : <div/>;
    console.log(this.state);
    return (
        <div className={container} >
          <Header />
          <div className={videoWrapper}>
            <VideoPlayer
              autoplay = {true}
              type = {'video/mp4'}
              src={videoFile}
              subtitles = {[{lang: 'fr', src: videoFrSubtitleFR, default: true}, {lang: 'en', src: videoFrSubtitleEN}]}
              playTime = {this.state.playTime}
              onPause={() => this.handlePause() }
              onPlay={() => this.handlePlay() }
              onEnded={() => this.handleEnd() }
              play = {this.state.playing}
            />
          </div>
          <div className={controlsWrapper}>
            <button 
              className = {togglePlayPause}
              //tabIndex={0} onKeyDown={(e) => this.handleKeyDown(e)} //needs focus to work properly. Useless in touch screens interactivity
              onClick={() => this.togglePlay()}>
                {this.state.playing ? <MdPause size='1.5x'/> : <MdPlayArrow size='1.5x'/> }
            </button>
            {this.state.playing? <div/> : chapters }
          </div> 
      </div>
    )
  };
};

export default Film
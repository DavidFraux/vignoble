import React from "react"
import { navigate } from 'gatsby'
import Header from '../components/header.js';
import {
  goToMarkerControl,
  container,
  videoWrapper,
  video,
  onScreenPlayPause,
  controlsWrapper,
  togglePlayPause,
  langSwitchWrapper } from "./film.module.css";
import {  MdPause, MdPlayArrow, } from 'react-icons/md';
import videoFile from '../video/pressagev2.2.mp4';
import videoFrSubtitleFR from '../video/pressageV2.2-FR.vtt';
import videoFrSubtitleEN from '../video/pressagev2.2-EN.vtt';
import Switch from "react-switch";


function Marker(props) {
  return (
    <button 
      className={goToMarkerControl} onClick={ (e) => props.onClickMarker(props.target, e) }>{props.label}</button>
  )
}

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      english: false,
    };
    this.videoRef = React.createRef();
//    this.baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
  }

  handlePause() {
    this.setState({ playing: false });
  }

  handlePlay() {
    this.setState({ playing: true });
  }

  handleEnd() {
    setTimeout(() => navigate('/'), 1500 );
  }

  togglePlay() {
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  handleSwitchChange() {
    const lang = this.state.english ? 'fr' : 'en';//the upcomming lang,
    this.setState(prevState => ({ english: !prevState.english }));
    const textTracks = this.videoRef.current.textTracks;
    for (var i = 0; i < textTracks.length; i++) {
      console.log(textTracks[i].language);
      if (textTracks[i].language == lang) {
         textTracks[i].mode = 'showing';
      }
      else {
         textTracks[i].mode = 'hidden';
      }
   }
  }

  handleVideoClick() {
    this.togglePlay();
  }

  handleKeyDown(e) {
    if (e.keyCode === 32) {
      this.togglePlay();
    }
  }
  

  renderMarkers(markerList) {
    let markersRendered = [];
    for (const marker of markerList) {
      markersRendered.push(<Marker key = {marker.id} label= {marker.label} target = {marker.target} onClickMarker = {(i) => this.handleMarkerClick(i)} />)
    };
    return ( markersRendered )
  }

  handleMarkerClick(i) {
    this.videoRef.current.currentTime = i;
  }

  componentDidUpdate() {
    this.state.playing? this.videoRef.current.play() : this.videoRef.current.pause()
  }

  
  render() {
    const title = 'Le film';
    const markerList = [
      //{id: 'debut',      target: 0,    label: 'début'},
      {id: 'fouler',     target: 34,   label: 'fouler'},
      {id: 'jus',        target: 46,   label: '1er jus'},
      {id: 'former',     target: 69,   label: 'former'},
      {id: 'habiller',   target: 126,  label: 'habiller'},
      {id: 'manoeuvre1', target: 192,  label: 'manoeuvrer'},
      {id: 'presser',    target: 220,  label: 'presser'},
      {id: 'mout',       target: 251.5,label: 'moût'},
      {id: 'manoeuvre2', target: 274,  label: 'lever'},
      {id: 'retirer',    target: 303,  label: 'retirer'},
      {id: 'tailler',    target: 346,  label: 'tailler'},
      {id: 'reformer',   target: 388,  label: 'reformer'},
      {id: 'rhabiller',  target: 410,  label: 'rhabiller'},
    ];
    const markers = this.renderMarkers(markerList);

    return (
        <div className={container} >
          <Header headerText = {title}/>
          <div className={videoWrapper}>
            <video
              id='video'
              muted
              autoPlay
              preload={'auto'}
              type={'video/mp4'}
              controls={false}
              className={video}
              ref={this.videoRef}
              onPause={() => this.handlePause() }
              onPlay={() => this.handlePlay() }
              onClick={() => this.handleVideoClick()}
              onEnded={() => this.handleEnd() }
            >
              <source src={videoFile} type="video/mp4"/>

              <track label="Français" kind="subtitles" srcLang="fr" src={videoFrSubtitleFR} default/>
              <track label="Anglais" kind="subtitles" srcLang="en" src={videoFrSubtitleEN} />
            </video>
            {this.state.playing? 
              <div/> : 
              <div 
                id='videoPlayPause'
                role= 'button'
                tabIndex = {0}
                aria-label = 'play pause the video'
                className = {onScreenPlayPause}
                onClick = {() => this.handleVideoClick()}
              />
            }
            <label className = {langSwitchWrapper}>
              <span>FR</span> <Switch onChange={() => this.handleSwitchChange()} checked={this.state.english} onColor='#385080' offColor='#385080' uncheckedIcon={false} checkedIcon={false} /> <span>EN</span>
            </label>
          </div>
          <div className={controlsWrapper}>
            <button 
              className = {togglePlayPause}
              //tabIndex={0} onKeyDown={(e) => this.handleKeyDown(e)} //needs focus to work properly. Useless in touch screens interactivity
              onClick={() => this.togglePlay()}>
                {this.state.playing ? <MdPause size='1.5x'/> : <MdPlayArrow size='1.5x'/> }
            </button>
            {markers}
          </div> 
      </div>
    )
  };
};

export default Film
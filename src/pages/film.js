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
  togglePlayPause, } from "./film.module.css";
import {  MdPause, MdPlayArrow, } from 'react-icons/md';

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
    };
    this.videoRef = React.createRef();
    this.baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
  }

  handlePause() {

  }

  handleEnd() {
    setTimeout(() => navigate('/'), 1500 );
  }

  togglePlay() {
    this.setState(prevState => ({ playing: !prevState.playing }));
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
    const sample = this.baseURL + "pressagev2.1.mp4";
    const markerList = [
      //{id: 'debut',      target: 0,    label: 'début'},
      {id: 'fouler',     target: 34,   label: 'fouler'},
      {id: 'jus',        target: 46,   label: 'premier jus'},
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
            muted
            src={sample}
            autoPlay
            preload={'auto'}
            type={'video/mp4'}
            controls={false}
            className={video}
            ref={this.videoRef}
            onPause={() => this.handlePause() }
            onClick={() => this.handleVideoClick()}
            onEnded={() => this.handleEnd() }
            />
          {this.state.playing? 
            <div/> : 
            <div 
              role= 'button'
              tabIndex = {0}
              aria-label = 'play pause the video'
              className = {onScreenPlayPause}
              onClick = {() => this.handleVideoClick()}
            />
          }
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
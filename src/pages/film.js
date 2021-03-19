import React from "react"
import { navigate } from 'gatsby'
import Header from '../components/header.js';
import styles from "./film.module.css";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from 'react-icons/md';

function Marker(props) {
  return (
    <button 
      className={styles.markers} onClick={ (e) => props.onClickMarker(props.target, e) }>{props.label}</button>
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

  renderMarkers(markerList) {
    let markersRendered = [];
    for (const marker of markerList) {
      markersRendered.push(<Marker label= {marker.label} target = {marker.target} onClickMarker = {(i) => this.handleMarkerClick(i)} />)
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
    const sample = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4';
    const markerList = [
      {target: 0, label: 'début'},
      {target: 3, label: 'inde'},
      {target: 7, label: 'afrique'},
      {target: 15, label: 'amérique'},
      {target: 23, label: 'pacifique'},
      {target: 28, label: 'japon'},
    ];
    const markers = this.renderMarkers(markerList);

    return (
    <div className={styles.container}>
      <Header headerText = {title}/>
        <div className={styles.videoWrapper}>
          <video
            muted
            src={sample}
            autoPlay
            preload={'auto'}
            type={'video/mp4'}
            controls={false}
            className={styles.video}
            ref={this.videoRef}
            onPause={() => this.handlePause() }
            onClick={() => this.handleVideoClick()}
            onEnded={() => this.handleEnd() }
            />
          {this.state.playing? <div/> : <div className={styles.playPause} onClick={() => this.handleVideoClick()}/>}
        </div>
        <div className={styles.controlsWrapper}>
          <button id={styles.toggle} className = {`${styles.navigate} ${styles.btn}`} onClick={() => this.togglePlay()}>{this.state.playing ? <MdPause/> : <MdPlayArrow/> }</button>
          {this.state.playing? <div/> : markers}
        </div>
        
    </div>
    )
  };
};

export default Film
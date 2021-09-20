import React from "react"
import {
  videoPlayer,
  videoControls,
  showControls,
  hideControls,
  togglePlay,
  progressBar,
  progress,
  videoOptions,
  controlBtn,
  timeControl,
  time, 
  startTime,
  endTime,
  volumeControls,
  volumeProgressbar,
  volumeProgress,
  onScreenPlayPause,
  langSwitchWrapper,
  } from "./videoPlayer.module.css";
import {MdVolumeUp, MdVolumeOff, MdPlayCircleOutline, MdPauseCircleOutline}  from 'react-icons/md';
import Switch from "react-switch";

import videoFrSubtitleFR from '../video/pressagev2.2-FR.vtt';
import videoFrSubtitleEN from '../video/pressagev2.2-EN.vtt';


/**
 *  function that takes in the complete duration and returns the duration in format {hours:00,minutes:00,seconds:00}
 */
 const calculateDuration = function(duration) {
  let seconds = parseInt(duration % 60);
  let minutes = parseInt((duration % 3600) / 60);
  let hours = parseInt(duration / 3600);

  return {
    hours: pad(hours),
    minutes: pad(minutes.toFixed()),
    seconds: pad(seconds.toFixed())
  };
};

/* used to prepend the single digit value with a Leading 0 and returns in string format*/
const pad = function(number) {
  if (number > -10 && number < 10) {
    return "0" + number;
  } else {
    return number.toString();
  }
};

/**
 * presentTime - currentTime of the vide
 * totalTime - complete Time of the video
 *
 * basic percentage formula which is rounded
 */
const getPercentage = function(presentTime, totalTime) {
  let calcPercentage = (presentTime / totalTime) * 100;
  return Math.round(calcPercentage);
};






class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.videoPlayer = React.createRef(); //reference for the entire videoPlayer
    this.videoRef = React.createRef(); // reference for the video element
    this.progressBar = React.createRef(); // reference for the progressbar
    this.progress = React.createRef(); // reference for the progress inside the progressbar
    this.volumeProgress = React.createRef();
    this.controlsRef = React.createRef();
    this.state = {
      currentTimeInSeconds: 0,// current time while the video is playing
      completeDurationInSeconds: 0,//  complete duration of the video
      currentDuration: { hours: "00", minutes: "00", seconds: "00" },// show the currentTimeInSeconds as {hours,minutes,seconds}
      completeDuration: { hours: "00", minutes: "00", seconds: "00" },//  show the completeDurationInSeconds as {hours,minutes,seconds}
      isPlaying: true,// determines the play state of the video
      progressPercentage: 0,// percentage value of the progress
      isVolumeOn: true,
      volumeValue: 1,
      volumePercentage: 100,
      isShowingControls: true,
      langB: false,// wich language in the subtitle switch selection langA or langB
    };
  }

  

  componentDidMount() {
    console.log(this.videoRef);
    //briefly show the controls so the user knows it exists
    this.timerControlsAppearAtStart = setTimeout(() => { this.setState({isShowingControls: false}) }, 2500);
  }

  componentWillUnmount() {
    clearTimeout(this.timerControlsAppearAtStart);
    this.setState({ isPlaying: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.playTime !== prevProps.playTime) {//this is used to set chapter access from outside the component 
      this.videoRef.current.currentTime = this.props.playTime;
      }
    if (this.props.play !== prevProps.play) {//this is used to set play/pause access from outside the component
      this.props.play ? this.handlePlay() : this.handlePause();
    }
    }
  
    

  /**
   *onLoadedData - we need to update the completeDurationInSeconds and completeDuration
   */
  updateCompleteDuration = () => {
    let tempDur = this.videoRef.current.duration;
    this.setState({
      completeDurationInSeconds: tempDur,
      completeDuration: calculateDuration(tempDur)
    });
  };

  /**
   * onTimeUpdate - while the video is playing update the currentTimeInSeconds, currentDuration {hours,minutes,seconds} and the progressPercentage
   * toFixed(2) - used to fix the duration values to atmost 2 digits after precision
   */
  updateCurrentDuration = () => {
    let tempCurrentTime = this.videoRef.current.currentTime;
    let tempDur = this.state.completeDurationInSeconds;
    this.setState({
      currentTimeInSeconds: tempCurrentTime,
      currentDuration: calculateDuration(tempCurrentTime),
      progressPercentage: getPercentage(
        tempCurrentTime.toFixed(2),
        tempDur.toFixed(2)
      )
    });
  };

  /**
   *onEnded - once the video is ended set the isPlaying state to false
   */
  onEnded = () => {
    // this.setState({ isPlaying: false, isShowingControls: true });
    // this.videoRef.current.currentTime = 0;
    this.props.onEnded();
  };

  /*
    handles the play button click and set the isPlaying to TRUE
  */
  handlePlay = () => {
    this.videoRef.current.play();
    this.setState({ isPlaying: true });
    this.setState({ isShowingControls: false });
    this.props.onPlay();
  };

  /**
   * handles the pause state and set the isPlaying to FALSE
   */

  handlePause = () => {
    this.videoRef.current.pause();
    this.setState({ isPlaying: false });
    this.setState({ isShowingControls: true });
    this.props.onPause();
  };

  /**
   * handles the clikc on the progressbar
   *
   * How to Calculate the ProgressPosition
   *  ==> Get the x-coordinate value of the pointer clicked using e.pageX (gives the x position)
   *  ==> get the position of the videoPlayer from left
   *  ==> set the progressPosition = e.pageX - this.videoPlayer.current.offsetLeft (gives the click position on the video player)
   *  ==> we need to calculate the progress bar percentage based on the click - ( click Position / video player width) * 100 --> percentage
   *
   * Setting the current time
   *  ==> currentTime = (click position * video complete duration in seconds) / progressbar width
   */
  handleProgress = e => {
    let tempProgressPosition = e.pageX - this.videoPlayer.current.offsetLeft;
    let tempProgressPercentage =
      (tempProgressPosition / this.videoPlayer.current.clientWidth) * 100;
    this.setState({
      progressPercentage: tempProgressPercentage
    });
    this.videoRef.current.currentTime =
      (tempProgressPosition * this.state.completeDurationInSeconds) /
      this.progressBar.current.clientWidth;
  };

  handleClick = (e) => {
    //check wether the click on video is not a click on the controls bar
    if (e.target  !==  this.controlsRef.current && !this.controlsRef.current.contains(e.target)) {
      if (this.state.isPlaying) {
        this.handlePause();
      } else {
        this.handlePlay();
        //this.setState({ isShowingControls: false });
      }
    }
  }

  handleSwitchChange = () => {
    const lang = this.state.langB ? 'fr' : 'en';//the upcomming lang,
    this.setState(prevState => ({ langB: !prevState.langB }));
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

  toggleVolume = () => {
    this.setState({ isVolumeOn: !this.state.isVolumeOn });
    this.videoRef.current.volume = this.videoRef.current.volume
      ? 0
      : this.state.volumeValue;
  };

  updateVolume = () => {
    this.setState({
      volumePercentage: this.videoRef.current.volume * 100
    });
  };

  setVolume = e => {
    let tempVolumePosition =
      e.pageX -
      this.videoPlayer.current.offsetLeft -
      this.volumeProgress.current.offsetLeft;
    let tempVolumeValue =
      tempVolumePosition / this.volumeProgress.current.clientWidth;

    this.videoRef.current.volume = tempVolumeValue;

    this.setState({
      volumeValue: tempVolumeValue,
      isVolumeOn: true
    });
  };

  updateShowControls = () => {
    this.setState({ isShowingControls: true });
  };
  updateHideControls = () => {
    if (!this.videoRef.current.paused && !this.videoRef.current.ended) {
      this.setState({ isShowingControls: false });
    }
  };

  render() {
    /**
     * setting the width of the progress inside progressbar
     */
    let progressStyle = {
      width: this.state.progressPercentage + "%"
    };
    let volumeProgressStyle = {
      width: this.state.volumePercentage + "%"
    };
    return (
      <div>
        <div
          className={`${videoPlayer} ${this.state.isShowingControls ? showControls : hideControls}`}
          ref={this.videoPlayer}
          // onMouseEnter={this.updateShowControls}
          // onMouseLeave={this.updateHideControls}
          onClick = {this.handleClick}
        >
          <video
            ref={this.videoRef}
            allow="autoplay"
            autoPlay = {this.props.autoplay}
            preload={'auto'}
            type={this.props.type}
            onPlay = {this.handlePlay}
            onPause  ={this.handlePause}
            onTimeUpdate={this.updateCurrentDuration}
            onLoadedData={this.updateCompleteDuration}
            onEnded={this.onEnded}
            onVolumeChange={this.updateVolume}
            disablePictureInPicture = {true}
          >
            <source src={this.props.src} />
            <track label="Français" kind="subtitles" srcLang="fr" src={videoFrSubtitleFR} default/>
            <track label="Anglais" kind="subtitles" srcLang="en" src={videoFrSubtitleEN} />
          </video>
          {this.state.isPlaying? 
              <div/> : 
              <div 
                id='videoPlayPause'
                role= 'button'
                tabIndex = {0}
                aria-label = 'play pause the video'
                className = {onScreenPlayPause}
                onClick = {() => this.handleClick}
              />
            }

          <div className={videoControls} ref = {this.controlsRef}>
            <div
              className={progressBar}
              ref={this.progressBar}
              onClick={e => this.handleProgress(e)}
            >
              <span
                className={progress}
                style={progressStyle}
                ref={this.progress}
              />
            </div>
            <div className={videoOptions}>
              {/* PLAY PAUSE */}
              <div className={togglePlay}>
                {this.state.isPlaying ? <MdPauseCircleOutline className={controlBtn} onClick={this.handlePause}/> : <MdPlayCircleOutline className={controlBtn} onClick={this.handlePlay}/> }
              </div>

              {/* VOLUME */}
              <div className={volumeControls}>
                
                {this.state.isVolumeOn ? <MdVolumeUp className={controlBtn} onClick={this.toggleVolume}/> : <MdVolumeOff className={controlBtn} onClick={this.toggleVolume}/> }
               
                <div
                  className={volumeProgressbar}
                  ref={this.volumeProgress}
                  onClick={e => this.setVolume(e)}
                >
                  <span
                    className={volumeProgress}
                    style={volumeProgressStyle}
                  />
                </div>
              </div>
              {/* LANGUAGE */}
              <div className = {langSwitchWrapper}>
                <span>FR</span> <Switch onChange={() => this.handleSwitchChange()} checked={this.state.langB} onColor='#9cec5b' offColor='#9cec5b' uncheckedIcon={false} checkedIcon={false} height={20} /> <span>EN</span>
              </div>
              
              {/* TIME */}
              <div className={timeControl}>
                <div className={`${startTime} ${time}`}>
                  {this.state.currentDuration.hours}:
                  {this.state.currentDuration.minutes}:
                  {this.state.currentDuration.seconds}
                </div>
                /
                <div className={`${endTime} ${time}`}>
                  {this.state.completeDuration.hours}:
                  {this.state.completeDuration.minutes}:
                  {this.state.completeDuration.seconds}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default VideoPlayer
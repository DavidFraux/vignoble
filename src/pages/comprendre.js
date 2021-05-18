import React from 'react';
import Header from '../components/header.js';
import {
  controlsWrapper,
  mediaControls,
  btn,
  toggle,
  videoLeft,
  video,
  videoRight,} from './comprendre.module.css'
import TimeLine from "../components/timeLine";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from 'react-icons/md';

import footPoster from '../images/videoPosters/footPoster.jpg';
import footZoomPoster from '../images/videoPosters/footZoomPoster.jpg';
import pyramidPoster from '../images/videoPosters/pyramidPoster.jpg';
import tikalPoster from '../images/videoPosters/tikalPoster.jpg';
import lakePoster from '../images/videoPosters/lakePoster.jpg';
import lakeViewPoster from '../images/videoPosters/lakeViewPoster.jpg';
import gatePoster from '../images/videoPosters/gatePoster.jpg';
import foretPoster from '../images/videoPosters/foretPoster.jpg';

const title = 'Comprendre le fonctionnement du pressoir long-fut';
const baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
const steps = [{
    title: 'Fouler',
    description: 'fouler le raisin dans la maie, basse ou haute',
    videoRight: baseURL+"foot.mp4",
    posterRight: footPoster,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
  }, {
    title: 'Préparation',
    description: 'installer les moutons',
    videoRight:baseURL+"pyramid.mp4",
    posterRight: pyramidPoster,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
  }, {
    title: 'étape 3',
    description: 'a completer par exemple',
    videoRight:baseURL+"lake.mp4",
    posterRight: lakePoster,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
  }, {
    title: 'étape 4',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    posterRight: gatePoster,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
  }, {
    title: 'étape 5',
    description: 'a completer par exemple',
    videoRight: baseURL+"foot.mp4",
    posterRight: footPoster,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
  }, {
    title: 'étape 6',
    description: 'a completer par exemple',
    videoRight:baseURL+"lake.mp4",
    posterRight: lakePoster,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
  }, {
    title: 'étape 7',
    description: 'a completer par exemple',
    videoRight:baseURL+"pyramid.mp4",
    posterRight: pyramidPoster,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
  }, {
    title: 'étape 8',
    description: 'a completer par exemple',
    videoRight:baseURL+"lake.mp4",
    posterRight: lakePoster,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
  }, {
    title: 'étape 9',
    description: 'a completer par exemple',
    videoRight: baseURL+"foot.mp4",
    posterRight: footPoster,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
  }, {
    title: 'étape 10',
    description: 'a completer par exemple',
    videoRight:baseURL+"pyramid.mp4",
    posterRight: pyramidPoster,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
  }, {
    title: 'étape 11',
    description: 'a completer par exemple',
    videoRight:baseURL+"lake.mp4",
    posterRight: lakePoster,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
  }, {
    title: 'étape 12',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    posterRight: gatePoster,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
  }];


class Comprendre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStepIndex: 0,
      //readyVideo : 0,//managing wait for loaded content OR wait for video ends
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
      paused: false,
    };
    this._isMounted = false;
    this.videoL = React.createRef();
    this.videoR = React.createRef();
  }

  resetVideoStates() {
    this.setState({
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
    });
  }

  onClickStep(i) {
    if (this.state.activeStepIndex !== i) {
      // 
      this.setState({activeStepIndex: i,});
      this.setState({paused: false,});
      this.resetVideoStates();
    };
  }


  navigateSteps(i) {
    if (this._isMounted) {//protect from state changes if the component is unmounted during the timeOut
      const targetIndex = this.state.activeStepIndex + i;
      if(targetIndex < 0 || targetIndex  >= steps.length) {
        return false;
      }
      this.setState((prevState) => ({activeStepIndex: prevState.activeStepIndex + i}))
      this.videoL.current.load();
      this.videoR.current.load();
  //    this.setState({ activeStepIndex: this.state.activeStepIndex + i })
      this.resetVideoStates()
    }
  }


  // handleVideoClick() {
  //   if (this.state.endedVideo === videoCount) {//if both video ended
  //     this.setState({readyVideo : videoCount}) //triggers play videos
  //   }
  // }

  handleVideoEnded(side) {
    if (this.state.paused) {return false};
    if (side === 'L') {
      this.setState({Lplaying: false, Lended : true});
      if (this.state.Rended) {setTimeout(() => this.navigateSteps(1), 1000 )};
    }  else {
      this.setState({Rplaying: false, Rended : true});
      if (this.state.Lended) {setTimeout(() => this.navigateSteps(1), 1000 )};
    };
  }

  handleVideoReady(side) {
    if (this.state.paused) {return false};
    if (side === 'L') {
      this.setState({Lready : true});
      if (this.state.Rready) {setTimeout(() => this.playBoth(), 500 )}; //wait a littleBit the browser and element to really sync};
    }  else {
      this.setState({Rready : true});
      if (this.state.Lready) {setTimeout(() => this.playBoth(), 500 )};
    }
  }

  playBoth () {
    if (this._isMounted) {//protect from state changes if the component is unmounted during the timeOut
      if (!this.state.Lended)  { this.setState({ Lplaying: true}) };
      if (!this.state.Rended)  { this.setState({ Rplaying: true}) };
    }
  }

  //TODO replay button

  togglePlay() {
    if (this.state.paused) {
      this.playBoth()
      this.setState({ paused: false});
    } else {
      this.setState({ Lplaying: false, Rplaying: false, paused: true});
    }
  }

  handleVideoClick() {
    this.togglePlay()
  }

  handlePrev() {
    this.navigateSteps(-1);
    this.setState({paused: false,});
  }

  handleNext() {
    this.navigateSteps(1);
    this.setState({paused: false,});
  }

  componentDidUpdate() {
    this.state.Lplaying ? this.videoL.current.play() : this.videoL.current.pause();
    this.state.Rplaying ? this.videoR.current.play() : this.videoR.current.pause();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  render() {
    //the followin manage the onClick behavious for each step of the timeLine
    for (const [index, step] of steps.entries()) {
      step.onClick = (e) => {
        e.preventDefault();
        this.onClickStep(index);
      };
    };
    const currentStep = steps[this.state.activeStepIndex];
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header headerText = {title}/>
        <div className={controlsWrapper}>
          <button className = {mediaControls}             onClick={() => this.handlePrev()}>{<MdSkipPrevious size='1.5x'/>}</button>
          <button className = {mediaControls} id={toggle} onClick={() => this.togglePlay()}>{this.state.paused ? <MdPlayArrow size='1.5x'/> : <MdPause size='1.5x'/> }</button>
          <button className = {mediaControls}             onClick={() => this.handleNext()}>{<MdSkipNext size='1.5x'/>}</button>
        </div>
        
        <TimeLine steps={steps} activeStepIndex={this.state.activeStepIndex} navigateSteps = {(i) => this.navigateSteps(i)}/>
          <React.Fragment>
            <video 
                muted
                key={currentStep.title+'L'}
                src={currentStep.videoLeft}
                poster={currentStep.posterLeft}
                preload={'auto'}
                type={'video/mp4'}
                id={videoLeft}
                className={`${videoLeft} ${video}`}
                ref={this.videoL}
                onCanPlayThrough={() => this.handleVideoReady('L')}
                onClick={() => this.handleVideoClick()}
                onEnded={() => this.handleVideoEnded('L')}
                >
                <p>impossible de charger la video</p>
            </video>
            <video
                muted
                key={currentStep.title+'R'}
                src={currentStep.videoRight}
                poster={currentStep.posterRight}
                preload={'auto'}
                type={'video/mp4'}
                id={videoRight}
                className={`${video} ${videoRight}`}
                ref={this.videoR}
                onCanPlayThrough={() => this.handleVideoReady('R')}
                onClick={() => this.handleVideoClick()}
                onEnded={() => this.handleVideoEnded('R')}
                >
                <p>impossible de charger la video</p>
            </video>
        </React.Fragment>


      </React.Fragment>
    )
  };
}

export default Comprendre


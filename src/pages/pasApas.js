import React from 'react';
import Header from '../components/header.js';
import TouchSwipeEvents from '../components/TouchSwipeEvents.js';
import {
  videosWrapper,
  controlsWrapper,
  mediaControls,
  toggle,
  videoLeft,
  video,
  videoRight,
  infoBoxes,
  infoBox,
  donutWrapper,
  description,
  duration,
  saviezVous,
  infoBoxTitle,
  fadeOut,} from './pasApas.module.css';
import TimeLine from "../components/timeLine";
import Donut from "../components/donut";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdInfoOutline, MdSettings} from 'react-icons/md';
import { GiDuration } from 'react-icons/gi';
import dataSteps from "../data/steps.json";



const title = 'Le fonctionnement du pressoir long-fut pas à pas';
const baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
const postersFolder = require.context('../images/videoPosters', false, /./ , 'sync');//'lazy': the underlying files will be loaded asynchronously

//helps the understanding of webpack loader
// postersFolder.keys().forEach(filePath => {
//   console.log(filePath);
//   // load the component
//   console.log(postersFolder(filePath).default);
// //  postersFolder(filePath).then(module => {
// //         // module.default is the vue component
// //     console.log(module.default);
// //   });
// });



class PasApas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted : true,
      activeStepIndex: 0,
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
      paused: false,
    };
    this.videoL = React.createRef();
    this.videoR = React.createRef();
    this.buildFonctionnalSteps();
  }
  
  buildFonctionnalSteps() {
    for (const [index, step] of dataSteps.entries()) {
      const keyLeft = "./"+step.posterLeft;
      if (postersFolder.keys().includes(keyLeft)){
        step.posterLeftFile = postersFolder(keyLeft).default;
      }
      const keyRight = "./"+step.posterRight;
      if (postersFolder.keys().includes(keyRight)){
        step.posterRightFile = postersFolder(keyRight).default;
      }
      step.videoRight = baseURL+ step.videoRight;
      step.videoLeft = baseURL+ step.videoLeft;
      step.onClick = (e) => {//the followin manage the onClick behavious for each step of the timeLine
        e.preventDefault();
        this.onClickStep(index);
      };
    } 
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
      this.setState({activeStepIndex: i,});
      this.setState({paused: false,});
      this.resetVideoStates();
    };
  }


  navigateSteps(i) {
    if (this.state.isMounted) {//protect from state changes if the component is unmounted during the timeOut
      const targetIndex = this.state.activeStepIndex + i;
      if(targetIndex < 0 ) {
        return false;
      };
      if(targetIndex  >= dataSteps.length ) {
        this.setState({activeStepIndex:4});
        //#TODO somehow display onscreen message "on recommence une seconde pressée"
      } 
      else {//for all the other "normal" cases
        this.setState((prevState) => ({activeStepIndex: prevState.activeStepIndex + i}));
      }
      this.videoL.current.load();
      this.videoR.current.load();
      this.resetVideoStates();
    }
  }

  handleVideoEnded(side) {
    const delayAfterEnded = 8000;
    if (this.state.paused) {return false};
    if (side === 'L') {
      this.setState({Lplaying: false, Lended : true});
      if (this.state.Rended) {setTimeout(() => this.navigateSteps(1), delayAfterEnded )};
    }  else {
      this.setState({Rplaying: false, Rended : true});
      if (this.state.Lended) {setTimeout(() => this.navigateSteps(1), delayAfterEnded )};
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
    if (this.state.isMounted) {//protect from state changes if the component is unmounted during the timeOut
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

  handleswipes(i) {
    (i === 'left')? this.handleNext() : this.handlePrev();
  }

  componentDidUpdate() {
    this.state.Lplaying ? this.videoL.current.play() : this.videoL.current.pause();
    this.state.Rplaying ? this.videoR.current.play() : this.videoR.current.pause();
  }

  componentDidMount() {
    this.setState({isMounted : true});
  }

  componentWillUnmount() {
    this.setState({isMounted : false});
  }

  render() {
    console.log(this.state.Lplaying);
    const currentStep = dataSteps[this.state.activeStepIndex];
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header headerText = {title}/>        
        <TouchSwipeEvents onSwiped = {(i) => this.handleswipes(i)}/>
        <div className={controlsWrapper}>
          <button className = {mediaControls}             onClick={() => this.handlePrev()}>{<MdSkipPrevious size='1.5x'/>}</button>
          <button className = {mediaControls} id={toggle} onClick={() => this.togglePlay()}>{this.state.paused ? <MdPlayArrow size='1.5x'/> : <MdPause size='1.5x'/> }</button>
          <button className = {mediaControls}             onClick={() => this.handleNext()}>{<MdSkipNext size='1.5x'/>}</button>
        </div>
        
        <TimeLine steps={dataSteps} activeStepIndex={this.state.activeStepIndex} navigateSteps = {(i) => this.navigateSteps(i)}/>
          <React.Fragment>
            <div className={videosWrapper}>
              <video 
                  muted
                  key={currentStep.title+'L'}
                  src={currentStep.videoLeft}
                  poster={currentStep.posterLeftFile}
                  preload={'auto'}
                  type={'video/mp4'}
                  id={videoLeft}
                  className={`${videoLeft} ${video} ${this.state.Lended? fadeOut : null}`}
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
                  poster={currentStep.posterRightFile}
                  preload={'auto'}
                  type={'video/mp4'}
                  id={videoRight}
                  className={`${video} ${videoRight} ${this.state.Rended? fadeOut : null}`}
                  ref={this.videoR}
                  onCanPlayThrough={() => this.handleVideoReady('R')}
                  onClick={() => this.handleVideoClick()}
                  onEnded={() => this.handleVideoEnded('R')}
                  >
                  <p>impossible de charger la video</p>
              </video>
            </div>
            
            <div className = {infoBoxes} >
              <div className = {donutWrapper} >
                <Donut steps={dataSteps} activeStepIndex={this.state.activeStepIndex} animate={this.state.Rended && this.state.Lended}/>
              </div>
              <div className = {`${infoBox} ${duration}`}>
                <div className = {infoBoxTitle} ><GiDuration/>  Durée </div>
                <span>environ {currentStep.duration} minutes</span>
              </div>
              <div className = {`${infoBox} ${description}`}>
                <div className = {infoBoxTitle} ><MdSettings/>  À cette étape  </div>
                <span>{currentStep.description}</span>
              </div>
              <div className = {`${infoBox} ${saviezVous}`}>
                <div className = {infoBoxTitle} ><MdInfoOutline/>  Le saviez-vous ?</div>
                <span>{currentStep.annecdote}</span>
              </div>
            </div>
        </React.Fragment>
      </React.Fragment>
    )
  };
}

export default PasApas
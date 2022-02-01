import React from 'react';
import { navigate } from 'gatsby'
import Header from '../components/header.js';
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
  fadeIn, 
  hidden,
  donutWrapper,
  description,
  shortDescription,
  shortDescriptionText,
  duration,
  difficulty,
  stars,
  saviezVous,
  saviezVousFront,
  saviezVousBack,
  infoBoxTitle,
  infoBoxResponse,
  fadeOut,
  waiting} from './pasApas.module.css';
import TimeLine from "../components/timeLine";
import Donut from "../components/donut";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdInfoOutline, MdSettings, MdStar, MdStarBorder, MdTrendingUp} from 'react-icons/md';
import { GiDuration } from 'react-icons/gi';
import {GoLightBulb} from 'react-icons/go';
import ReactCardFlip from 'react-card-flip';
import placeHolderPict from "../images/placeHolder.png";
import placeHolderVideo from "../video/placeHolder.webm";
import crypto from 'crypto';
import chroma from "chroma-js";
import fetchAPI from '../components/fetchREST.js';
import Loading from '../components/loading.js'
import OnScreenButtons from '../components/onScreenButtons.js';
import Timer from '../components/timer.js';
import ProgressBar from '../components/progressBar.js';

const title = 'Le fonctionnement du pressoir long-fut pas à pas';


function numberToStars(number, maxStars){
  let i = 0;
  let stars = []
  for ( i; i < number; i++) {
    stars.push(<MdStar key = {crypto.randomBytes(20).toString('hex')}/>);
    stars.push(' ');
  };
  for (i; i<maxStars; i++) {
    stars.push(<MdStarBorder key = {crypto.randomBytes(20).toString('hex')}/>);
    stars.push(' ');
  }
  return stars
}


class PasApas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted : true,
      activeStepIndex: 0,
      stepsData: null,
      apiFetched: false,
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
      paused: false,
      showInfo: false,
      animateDonut: false,
      saviezVousClicked: false,
      readingTimeCompleted : 0,
    };
    this.videoL = React.createRef();
    this.videoR = React.createRef();
    this.timers = [];
    this.readingTimer = new Timer(() => this.navigateSteps(1), 30000, 'reading');
    this.showInfoTimer = new Timer(() => this.setState({showInfo:true}), 1000, 'showInfo');
    this.animateDonutTimer = new Timer(() => this.setState({animateDonut:true}), 3000, 'Donut');
    this.playBothTimer = new Timer(() => this.playBoth(), 500, 'playBoth');
    this.timers.push(this.readingTimer, this.showInfoTimer, this.animateDonutTimer, this.playBothTimer);
  }
  
  resetVideoStates() {
    this.setState({
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
      saviezVousClicked: false,
      showInfo: false,
      animateDonut: false,
      readingTimeCompleted : 0,
    });
    for (let timer of this.timers) {
      timer.clear();
    }
  }

  onClickStep(i) {
    if (this.state.activeStepIndex !== i) {
      this.setState({activeStepIndex: i,});
      this.setState({paused: false,});
      this.resetVideoStates();
    };
  }

  navigateSteps(i) {
    if (this.state.isMounted ) {//protect from state changes if the component is unmounted
      const targetIndex = this.state.activeStepIndex + i;
      if ( targetIndex < 0 ) {
        return false;
      };
      if ( targetIndex  >= this.state.stepsData.length ) {
        //this.setState({activeStepIndex:4});//#TODO somehow display onscreen message "on recommence une seconde pressée"
        navigate('/');
      } 
      else {//for all the other "normal" cases
        this.setState((prevState) => ({activeStepIndex: prevState.activeStepIndex + i}));
      }
      this.videoL.current.load();
      this.videoR.current.load();
      this.resetVideoStates();
    }
  }

  computeRemaining() {//this is for the progressBar
    const readingCompleted = 100 * (this.state.stepsData[this.state.activeStepIndex].readingDelay - this.readingTimer.feedbackRemaining() ) / (this.state.stepsData[this.state.activeStepIndex].readingDelay*0.95);// *0.95 for diplay 100% shortly before navigate to the next step
    if (!this.state.paused && this.state.isMounted){
      this.setState({readingTimeCompleted : Math.round(readingCompleted) })
    }
  }

  handleBothVideoEnded() {
    const readingDelay = this.state.stepsData[this.state.activeStepIndex].readingDelay;
    this.readingTimer.reset(readingDelay);
    this.showInfoTimer.reset();
    this.animateDonutTimer.reset();
    //this is for the progressBar
    setInterval(() => this.computeRemaining(), 500);
  }

  handleVideoEnded(side) {
    if (this.state.paused) {return false};
    if (side === 'L') {
      
      this.setState({Lplaying: false, Lended : true});
      if (this.state.Rended) {//means both have now ended
        this.handleBothVideoEnded();}
    }  else {
      this.setState({Rplaying: false, Rended : true});
      if (this.state.Lended) {//means both have now ended
        this.handleBothVideoEnded();}
    };
  }

  handleVideoReady(side) {
    if (this.state.paused) {return false};
    if (side === 'L') {
      this.setState({Lready : true});
      if (this.state.Rready) {this.playBothTimer.reset()}; //wait a littleBit the browser and element to really sync};
    }  else {
      this.setState({Rready : true});
      if (this.state.Lready) {this.playBothTimer.reset()};
    }
  }

  playBoth () {
    this.setState({ paused: false});
    if (this.state.isMounted) {//protect from state changes if the component is unmounted
      if (!this.state.Lended)  { this.setState({ Lplaying: true}) };
      if (!this.state.Rended)  { this.setState({ Rplaying: true}) };
    }
  }

  replayBoth () {
    if (this.state.isMounted) {//protect from state changes if the component is unmounted during the timeOut
      this.navigateSteps(0);
      this.videoL.current.currentTime = 0;
      this.videoR.current.currentTime = 0;
      this.playBoth();
    }
  }
  
  togglePlay() {
    if (this.state.paused) {
      this.playBoth();
      //this.setState({ paused: false});
      for (let timer of this.timers) {
        timer.resume();
      }
    } else {
      for (let timer of this.timers) {
        timer.pause();
      }
      this.setState({ Lplaying: false, Rplaying: false, paused: true, });
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
    this.setState({isMounted : true, showInfo: false});
    // BUILD FONCTIONNAL STEPS //
    fetchAPI('steps').then( apiSteps => {
      const colors = chroma.scale(
        ['deeppink','teal','yellow','red']//['red','yellow','blue','darkgreen','deeppink' ]
      ).mode('hsv').colors(apiSteps.length);
      apiSteps.sort((a, b) => a.stepNum - b.stepNum);// sort the array with ascending stepNum
      for (const [index, step] of apiSteps.entries()) {
        step.color = colors[index];
        step.onClick = (e) => {//the followin manage the onClick behavious for each step of the timeLine
          e.preventDefault();
          this.onClickStep(index);
        };
      };
      //firsts renders are without this state, if too fast, it's flashing: bad sensation: better waiting a bit
      setTimeout(() => this.setState({stepsData : apiSteps , apiFetched: true}), 800 )
    }); 
  }

  componentWillUnmount() {
    this.resetVideoStates();
    this.setState({isMounted : false});
  }

  render() {
    const currentStep = 
      this.state.apiFetched? 
      this.state.stepsData[this.state.activeStepIndex]
      : 
      {id:null, videoLeft: null, posterLeft: null, videoRight: null, posterRight: null, color: '#ffff'};
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header />        
        <TouchSwipeEvents onSwiped = {(i) => this.handleswipes(i)}/>
        <div className={controlsWrapper}>
          <button className = {mediaControls} onClick={() => this.handlePrev()}>{<MdSkipPrevious size='1.5x'/>}</button>
          <button className = {mediaControls} id={toggle} onClick={() => this.togglePlay()}>{this.state.paused ? <MdPlayArrow size='1.5x'/> : <MdPause size='1.5x'/> }</button>
          <button className = {mediaControls} onClick={() => this.handleNext()}>{<MdSkipNext size='1.5x'/>}</button>
        </div>
        
        
          {this.state.apiFetched ?
            <TimeLine steps={this.state.stepsData} activeStepIndex={this.state.activeStepIndex} navigateSteps = {(i) => this.navigateSteps(i)}/> 
            : 
            <div className = {waiting}>
              <div><Loading dark={true} /></div>
            </div>
          }
          <React.Fragment>
            <div className={videosWrapper}>
              <video 
                  muted
                  key={currentStep.id+'L'}
                  src={currentStep.videoLeft ? process.env.GATSBY_API_URL + currentStep.videoLeft.url : placeHolderVideo}
                  poster={currentStep.posterLeft ? process.env.GATSBY_API_URL + currentStep.posterLeft.url : placeHolderPict}
                  preload={'auto'}
                  type={'video/webm'}
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
                  key={currentStep.id+'R'}
                  src={currentStep.videoRight ? process.env.GATSBY_API_URL + currentStep.videoRight.url : placeHolderVideo }
                  poster={currentStep.posterRight ? process.env.GATSBY_API_URL + currentStep.posterRight.url : placeHolderPict }
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
            {(this.state.paused || this.state.showInfo) && 
              <OnScreenButtons 
                displayPrevNext={true}
                prevFunction = {() => this.handlePrev()}
                nextFunction = {() => this.handleNext()}
                playFunction = {() => this.togglePlay()}
                pauseFunction = {() => this.togglePlay()}
                replayFunction = {() => this.replayBoth()}
                paused = {this.state.paused}
                ended = {this.state.Lended && this.state.Rended}
              />
            }
            
            <div className = {`${infoBoxes} ${this.state.showInfo? fadeIn : hidden}`} >
              <ProgressBar 
                componentClass = {`${infoBox} ${shortDescription}`}
                color = {chroma(currentStep.color).alpha(0.2)}
                labelClass = {shortDescriptionText}
                labelText = {currentStep.shortDescription}
                completed = {this.state.readingTimeCompleted}
              />

              {/* <div className = {`${infoBox} ${shortDescription}`} style= {{backgroundColor: chroma(currentStep.color).alpha(0.3)}} >
                <span className = {shortDescriptionText}> {currentStep.shortDescription}</span>
              </div> */}
              <div className = {donutWrapper} >
                {this.state.apiFetched ? 
                  <Donut steps={this.state.stepsData} activeStepIndex={this.state.activeStepIndex} animate={this.state.animateDonut}/>
                  :
                  <Loading/>
                }
              </div>
              <div className = {`${infoBox} ${duration}`}>
                <div className = {infoBoxTitle} ><GiDuration/>  Durée estimée</div>
                <div>{currentStep.duration} minutes</div>
              </div>
              <div className = {`${infoBox} ${difficulty}`}>
                <div className = {infoBoxTitle} ><MdTrendingUp/>  Difficulté </div>
                <div className= {stars}>{numberToStars(currentStep.difficulty,5)}</div>
              </div>
              <div className = {`${infoBox} ${description}`}>
                <div>{currentStep.description}</div>
              </div>
              <div className = {saviezVous} onClick = {() => this.setState(prevState => ({ saviezVousClicked: !prevState.saviezVousClicked }))}>
                <ReactCardFlip isFlipped={this.state.saviezVousClicked} flipDirection="horizontal" containerStyle={{height: "100%"}}>
                  <div className = {`${infoBox} ${saviezVousFront}`}>
                    <div className = {infoBoxTitle} ><GoLightBulb/>  Pour les curieux</div>
                    <span>{currentStep.question}</span>
                    <div className = {infoBoxResponse}>Réponse</div>
                  </div>

                  <div className = {`${infoBox} ${saviezVousBack}`}>
                    <div className = {infoBoxTitle} ><GoLightBulb/>  Pour les curieux</div>
                    <span>{currentStep.response}</span>
                  </div>
                </ReactCardFlip>
              </div>
            </div>
        </React.Fragment>
      </React.Fragment>
    )
  };
}

export default PasApas
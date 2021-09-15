import React from 'react';
import { navigate } from 'gatsby'
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
  fadeIn, 
  hidden,
  donutWrapper,
  description,
  short,
  duration,
  difficulty,
  stars,
  saviezVous,
  saviezVousFront,
  saviezVousBack,
  infoBoxTitle,
  infoBoxReponse,
  fadeOut,} from './pasApas.module.css';
import TimeLine from "../components/timeLine";
import Donut from "../components/donut";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdInfoOutline, MdSettings, MdStar, MdStarBorder, MdTrendingUp} from 'react-icons/md';
import { GiDuration } from 'react-icons/gi';
import {GoLightBulb} from 'react-icons/go';
import ReactCardFlip from 'react-card-flip';
import dataSteps from "../data/steps.json";
import placeHolderPict from "../images/placeHolder.png";
import placeHolderVideo from "../video/placeHolder.webm";
import crypto from 'crypto';
import chroma from "chroma-js";

const title = 'Le fonctionnement du pressoir long-fut pas à pas';
const videoFolder = require.context('../video/pasApas', false, /./ , 'lazy');
const postersFolder = require.context('../images/videoPosters', false, /./ , 'lazy');//'sync' sinon 'lazy': the underlying files will be loaded synchronously -> using promises


//helps the understanding of webpack loader
// postersFolder.keys().forEach(filePath => {
//   // load the component
// //  postersFolder(filePath).then(module => {
// //         // module.default is the vue component
// //     console.log(module.default);
// //   });
// });


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
      step:{},
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
    };
    this.videoL = React.createRef();
    this.videoR = React.createRef();
    this.timeOuts = [];
    this.readingTimeOut = null;
    this.buildFonctionnalSteps();
  }
  
  buildFonctionnalSteps() {
    const colors = chroma.scale(
      ['deeppink','teal','yellow','red']//['red','yellow','blue','darkgreen','deeppink' ]
    ).mode('hsv').colors(dataSteps.length);

    for (const [index, step] of dataSteps.entries()) {
      postersFolder("./"+step.posterLeft).then(module => {
        step.posterLeftFile = module.default;
      }).catch(err => {
        console.log(err);
        step.posterLeftFile = placeHolderPict;
      });
      postersFolder("./"+step.posterRight).then(module => {
        step.posterRightFile = module.default;
      }).catch(err => {
        console.log(err);
        step.posterRightFile = placeHolderPict;
      });
      videoFolder("./"+step.videoLeft).then(module => {
        step.videoLeftFile = module.default;
      }).catch(err => {
        console.log(err);
        step.videoLeftFile = placeHolderVideo;
      });
      videoFolder("./"+step.videoRight).then(module => {
        step.videoRightFile = module.default;
      }).catch(err => {
        console.log(err);
        step.videoRightFile = placeHolderVideo;
      });
      step.color = colors[index];
      if (!step.id) {step.id = crypto.randomBytes(20).toString('hex')};
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
      saviezVousClicked: false,
      showInfo: false,
      animateDonut: false,
    });
    for (let timeOut of this.timeOuts) {
      clearTimeout(timeOut);
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
    if (this.state.isMounted ) {//protect from state changes if the component is unmounted during the timeOut
      const targetIndex = this.state.activeStepIndex + i;
      if ( targetIndex < 0 ) {
        return false;
      };
      if ( targetIndex  >= dataSteps.length ) {
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

  handleBothVideoEnded() {
    this.readingTimeOut = setTimeout(() => this.navigateSteps(1), 35000 );
    this.timeOuts.push(this.readingTimeOut);
    //this.timeOuts.push(setTimeout(() => this.navigateSteps(1), 35000 )); //#TODO stop this timeOut if paused
    this.timeOuts.push(setTimeout(() => this.setState({showInfo:true}), 1000 ));
    this.timeOuts.push(setTimeout(() => this.setState({animateDonut:true}), 3000 ));
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
      if (this.state.Rready) {this.timeOuts.push(setTimeout(() => this.playBoth(), 500 ))}; //wait a littleBit the browser and element to really sync};
    }  else {
      this.setState({Rready : true});
      if (this.state.Lready) {this.timeOuts.push(setTimeout(() => this.playBoth(), 500 ))};
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
      if (this.state.Lended && this.state.Rended) {this.readingTimeOut = setTimeout(() => this.navigateSteps(1), 5000 );}//if timeOut was set, reset something shorter, just in order not to be "stucked" in a step for "lost" people
    } else {
      if (this.readingTimeOut) {clearTimeout(this.readingTimeOut)}; //avoid navigating to next step while paused
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
  }

  componentWillUnmount() {
    this.resetVideoStates();
    this.setState({isMounted : false});
  }

  render() {
    const currentStep = dataSteps[this.state.activeStepIndex];
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header />        
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
                  key={currentStep.id+'L'}
                  src={currentStep.videoLeftFile}
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
                  key={currentStep.id+'R'}
                  src={currentStep.videoRightFile}
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
            
            <div className = {`${infoBoxes} ${this.state.showInfo? fadeIn : hidden}`} >
              <div className = {`${infoBox} ${short}`} style= {{backgroundColor: chroma(currentStep.color).alpha(0.3)}} >
                {currentStep.short}
              </div>
              <div className = {donutWrapper} >
                <Donut steps={dataSteps} activeStepIndex={this.state.activeStepIndex} animate={this.state.animateDonut}/>
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
                {/* <div className = {infoBoxTitle} ><MdSettings/>  À cette étape  </div> */}
                <div>{currentStep.description}</div>
              </div>
              <div className = {saviezVous} onClick = {() => this.setState(prevState => ({ saviezVousClicked: !prevState.saviezVousClicked }))}>
                <ReactCardFlip isFlipped={this.state.saviezVousClicked} flipDirection="horizontal" containerStyle={{height: "100%"}}>
                  <div className = {`${infoBox} ${saviezVousFront}`}>
                    <div className = {infoBoxTitle} ><GoLightBulb/>  Pour les curieux</div>
                    <span>{currentStep.question}</span>
                    <div className = {infoBoxReponse}>Réponse</div>
                  </div>

                  <div className = {`${infoBox} ${saviezVousBack}`}>
                    <div className = {infoBoxTitle} ><GoLightBulb/>  Pour les curieux</div>
                    <span>{currentStep.annecdote}</span>
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
import React from 'react';
import Header from '../components/header.js';
import TouchSwipeEvents from '../components/TouchSwipeEvents.js'
import {
  videoContainer,
  controlsWrapper,
  mediaControls,
  toggle,
  videoLeft,
  video,
  videoRight,
  infoBoxes,
  infoBox,
  duration,
  saviezVous,} from './pasApas.module.css'
import TimeLine from "../components/timeLine";
import AnalogClock from "../components/analogClock"
import Donut from "../components/donut"
import CircleProgressBarBase from "../components/circle"
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdInfoOutline } from 'react-icons/md';
import { GiDuration } from 'react-icons/gi'


import footPoster from '../images/videoPosters/footPoster.jpg';
import footZoomPoster from '../images/videoPosters/footZoomPoster.jpg';
import pyramidPoster from '../images/videoPosters/pyramidPoster.jpg';
import tikalPoster from '../images/videoPosters/tikalPoster.jpg';
import lakePoster from '../images/videoPosters/lakePoster.jpg';
import lakeViewPoster from '../images/videoPosters/lakeViewPoster.jpg';
import gatePoster from '../images/videoPosters/gatePoster.jpg';
import foretPoster from '../images/videoPosters/foretPoster.jpg';

import postertest from '../images/videoPosters/postertest.png';

import poster0 from '../images/videoPosters/poster0.jpg';
import poster1 from '../images/videoPosters/poster1.jpg';
import poster2 from '../images/videoPosters/poster2.jpg';
import poster3 from '../images/videoPosters/poster3.jpg';
import poster4 from '../images/videoPosters/poster4.jpg';
import poster5 from '../images/videoPosters/poster5.jpg';
import poster6 from '../images/videoPosters/poster6.jpg';
import poster7 from '../images/videoPosters/poster7.jpg';
import poster8 from '../images/videoPosters/poster8.jpg';
import poster9 from '../images/videoPosters/poster9.jpg';
import poster10 from '../images/videoPosters/poster10.jpg';
import poster11 from '../images/videoPosters/poster11.jpg';
import poster12 from '../images/videoPosters/poster12.jpg';


const title = 'Le fonctionnement du pressoir long-fut pas à pas';
const baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
const steps = [{
    title: 'Verser',
    description: 'Verser le raisin frais dans la maie',
    videoRight: baseURL+"pressage0.mp4",
    posterRight: poster0,
    videoLeft: baseURL+"test.webm",
    posterLeft: postertest,
    duration : 15,
    from: '7:00',
    to: '7:15',
  }, {
    title: 'Fouler',
    description: 'Fouler aux pieds le raisin dans la maie, basse ou haute',
    videoRight:baseURL+"pressage1.mp4",
    posterRight: poster1,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
    duration : 30,
    from: '7:15',
    to: '7:45',
  }, {
    title: '1er moût',
    description: 'Un premier moût (jus) de raisin peut être recueilli',
    videoRight:baseURL+"pressage2.mp4",
    posterRight: poster2,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 10,
    from: '7:45',
    to: '7:50',
  }, {
    title: 'Constituer',
    description: 'Les grapes de raisin sont organisé en cep (tas de raisin à presser)',
    videoRight:baseURL+"pressage3.mp4",
    posterRight: poster3,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
    duration : 25,
    from: '7:50',
    to: '8:10',
  }, {
    title: 'Habiller',
    description: 'Le cep est couvert de qunouilles, couchages, moutons puis blins en bois, destinés à répartir la charge de pressage',
    videoRight: baseURL+"pressage4.mp4",
    posterRight: poster4,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
    duration : 20,
    from: '8:10',
    to: '8:30',
  }, {
    title: 'Positionner',
    description: `Le fut-haut (poutre mobile) du pressoir est positionnée et verrouillée en bas d'un coté grâce aux aiguilles`,
    videoRight:baseURL+"pressage5.mp4",
    posterRight: poster5,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 10,
    from: '8:30',
    to: '8:40',
  }, {
    title: 'Presser',
    description: `Le pressage peut commencer, d'un coté le fut est verrouillé en bas, de l'autre on l'abaisse avec la vis`,
    videoRight:baseURL+"pressage6.mp4",
    posterRight: poster6,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
    duration : 10,
    from: '8:40',
    to: '8:50:',
  }, {
    title: 'Moût',
    description: `Au fur et à mesure, le moût est receuilli, versé dans des barriques.
    Souvent le pression est maintenue plusieurs heures pour récupérer tout le moût.`,
    videoRight:baseURL+"pressage7.mp4",
    posterRight: poster7,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 180,
    from: '8:50',
    to: '13:00',
  }, {
    title: 'Relacher',
    description: `Après plusieurs heures, on relache la pression. Le fut est levé`,
    videoRight: baseURL+"pressage8.mp4",
    posterRight: poster8,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
    duration : 10,
    from: '13:00',
    to: '13:10',
  }, {
    title: 'Manoeuvrer',
    description: `La manoeuvre du fût permet de le positionner en hauteur`,
    videoRight:baseURL+"pressage9.mp4",
    posterRight: poster9,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
    duration : 10,
    from: '13:10',
    to: '13:20',
  }, {
    title: 'Déshabiller',
    description: 'La couverture du cep est retirée',
    videoRight:baseURL+"pressage10.mp4",
    posterRight: poster10,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 15,
    from: '13:20',
    to: '13:30',
  }, {
    title: 'Cisailler',
    description: `Le cep s'est étalé sous la pression, il est très compact, il faut le cisaillé pour le reformer`,
    videoRight:baseURL+"pressage11.mp4",
    posterRight: poster11,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
    duration : 45,
    from: '13:30',
    to: '14:15',
  }, {
    title: 'Reformer',
    description:`On reforme le cep pour laisser un passage périphérique au moût et presser l'ensemble une seconde fois, parfois même une troisième fois le lendemain matin`,
    videoRight:baseURL+"pressage12.mp4",
    posterRight: poster12,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
    duration : 30,
    from: '14:15',
    to: '14:35',
  }];




class PasApas extends React.Component {
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
      this.setState({activeStepIndex: i,});
      this.setState({paused: false,});
      this.resetVideoStates();
    };
  }


  navigateSteps(i) {
    if (this._isMounted) {//protect from state changes if the component is unmounted during the timeOut
      const targetIndex = this.state.activeStepIndex + i;
      if(targetIndex < 0 ) {
        return false;
      };
      if(targetIndex  >= steps.length ) {
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

  handleswipes(i) {
    (i === 'left')? this.handleNext() : this.handlePrev();
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

        <TouchSwipeEvents onSwiped = {(i) => this.handleswipes(i)}/>
        <div className={controlsWrapper}>
          <button className = {mediaControls}             onClick={() => this.handlePrev()}>{<MdSkipPrevious size='1.5x'/>}</button>
          <button className = {mediaControls} id={toggle} onClick={() => this.togglePlay()}>{this.state.paused ? <MdPlayArrow size='1.5x'/> : <MdPause size='1.5x'/> }</button>
          <button className = {mediaControls}             onClick={() => this.handleNext()}>{<MdSkipNext size='1.5x'/>}</button>
        </div>
        
        <TimeLine steps={steps} activeStepIndex={this.state.activeStepIndex} navigateSteps = {(i) => this.navigateSteps(i)}/>
          <React.Fragment>
            <div className={videoContainer}>
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
            </div>
            <div className={videoContainer}>
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
            </div>
            
            <div className = {infoBoxes} >
              <Donut steps={steps} activeStepIndex={this.state.activeStepIndex}/> 
              <div className = {`${infoBox} ${duration}`}>
                <div><GiDuration/> durée </div>
                <span>environ {currentStep.duration} minutes</span>
              </div>
              <div className = {`${infoBox} ${saviezVous}`}>
                <div><MdInfoOutline/> le saviez-vous ?</div>
                <span>{currentStep.duration}</span>
              </div>
            </div>
        </React.Fragment>
      </React.Fragment>
    )
  };
}

export default PasApas
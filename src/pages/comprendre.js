import React from 'react';
import Header from '../components/header.js';
import styles from './comprendre.module.css'
import TimeLine from "../components/timeLine";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from 'react-icons/md';

const title = 'Comprendre le fonctionnement du pressoir long-fut';
const baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
const steps = [{
    title: 'Fouler',
    description: 'fouler le raisin dans la maie, basse ou haute',
    videoRight:baseURL+"foot.mp4",
    videoLeft:baseURL+"footZoom.mp4",
  }, {
    title: 'Préparation',
    description: 'installer les moutons',
    videoRight:baseURL+"pyramid.mp4",
    videoLeft:baseURL+"tikal.mp4",
  }, {
    title: 'étape 3',
    description: 'a completer par exemple',
    videoRight:baseURL+"lake.mp4",
    videoLeft:baseURL+"lakeView.mp4",
  }, {
    title: 'étape 4',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 5',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 6',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 7',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 8',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 9',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 10',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 11',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
  }, {
    title: 'étape 12',
    description: 'a completer par exemple',
    videoRight:baseURL+"gate.mp4",
    videoLeft:baseURL+"foret.mp4",
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
    console.log(i, )
    if (this.state.activeStepIndex != i) {
      // 
      this.setState({activeStepIndex: i,});
      this.setState({paused: false,});
      this.resetVideoStates();
    };
  }


  navigateSteps(i) {
    const targetIndex = this.state.activeStepIndex + i;
    if(targetIndex < 0 || targetIndex  >= steps.length) {
      return false;
    }
    this.setState((prevState) => ({activeStepIndex: prevState.activeStepIndex + i}))
//    this.setState({ activeStepIndex: this.state.activeStepIndex + i })
    this.resetVideoStates()
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
    if (!this.state.Lended)  { this.setState({ Lplaying: true}) };
    if (!this.state.Rended)  { this.setState({ Rplaying: true}) };
  }

  //TODO replay button

  togglePlay() {
    if (this.state.paused) {
      //this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
      this.playBoth()
      this.setState({ paused: false});
    } else {
      this.setState({ Lplaying: false, Rplaying: false, paused: true});
    }
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

  
  render() {
    console.log(this.state);
    //the followin manage the onClick behavious for each step of the timeLine
    for (const [index, step] of steps.entries()) {
      step.onClick = (e) => {
        e.preventDefault();
        this.onClickStep(index);
      };
    };
    const currentStep = steps[this.state.activeStepIndex];
    return (
      <div>
        <title>{title}</title>
        <Header headerText = {title}/>
        <div className={styles.controlsWrapper}>
          <button className = {`${styles.navigate} ${styles.btn}`} onClick={() => this.handlePrev()}>{<MdSkipPrevious/>}</button>
          <button id={styles.toggle} className = {`${styles.navigate} ${styles.btn}`} onClick={() => this.togglePlay()}>{this.state.paused ? <MdPlayArrow/> : <MdPause/> }</button>
          <button className = {`${styles.navigate} ${styles.btn}`} onClick={() => this.handleNext()}>{<MdSkipNext/>}</button>
        </div>
        
        <TimeLine steps={steps} activeStepIndex={this.state.activeStepIndex} navigateSteps = {(i) => this.navigateSteps(i)}/>
          <React.Fragment>
            <video
                muted
                src={currentStep.videoLeft}
                preload={'auto'}
                type={'video/mp4'}
                id={styles.videoLeft}
                className={[styles.videoLeft, styles.video].join(' ')}
                ref={this.videoL}
                onCanPlayThrough={() => this.handleVideoReady('L')}
                //onClick={() => this.handleVideoClick()}
                onEnded={() => this.handleVideoEnded('L')}
                >
                <p>impossible de charger la video</p>
            </video>
            <video
                muted
                src={currentStep.videoRight}
                preload={'auto'}
                type={'video/mp4'}
                id={styles.videoRight}
                className={`${styles.video} ${styles.videoRight}`}
                ref={this.videoR}
                //onLoadedData={() => console.log('rightReady')}
                onCanPlayThrough={() => this.handleVideoReady('R')}
                //onClick={() => this.handleVideoClick()}
                onEnded={() => this.handleVideoEnded('R')}
                >
                <p>impossible de charger la video</p>
            </video>
        </React.Fragment>


      </div>
    )
  };
}

export default Comprendre


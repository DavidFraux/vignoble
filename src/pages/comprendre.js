import React from 'react';
import Header from '../components/header.js';
import styles from './comprendre.module.css'
import Container from "../components/container";
import TimeLine from "../components/timeLine";
import filmPict from '../images/film.png'
import threePict from '../images/3D.png'

//Generally, if you use a component in multiple places on a site,
//it should be in its own module file in the components directory.
//But, if it’s used only in one file, create it inline.
const User = (props) => (
  <div className = {styles.user}>
    <img alt='avatar' src={props.avatar} className = {styles.avatar}/>
    <div className = {styles.description}>
      <h2 className = {styles.username}>{props.username}</h2>
      <p className = {styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

const videoCount = 2;

class Comprendre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStepIndex: 0,
      waitedVideo : videoCount,
    };
    this.videoL = React.createRef();
    this.videoR = React.createRef();
    this.baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
  }

  resetWaitedVideos() {
    this.setState({waitedVideo : videoCount});
  }

  onClickStep(i) {
    this.setState({activeStepIndex: i,});
    this.resetWaitedVideos()
  }

  onClickButton(i) {
    this.setState({ activeStepIndex: this.state.activeStepIndex + i })
    this.resetWaitedVideos()
  }

  playVideos(){
    this.videoL.current.play();
    this.videoR.current.play();
    this.resetWaitedVideos()
  }
  
  componentDidUpdate() {
    if (this.state.waitedVideo === 0) {
      setTimeout(() => this.playVideos(), 500 ); //wait a littleBit the browser and element to really sync
    }
  }


  render() {
    const title = 'Comprendre le fonctionnement du pressoir long-fut';
    
    const steps = [{
      title: 'Fouler',
      description: 'fouler le raisin dans la maie, basse ou haute',
      videoRight:this.baseURL+"foot.mp4",
      videoLeft:this.baseURL+"footZoom.mp4",
      onClick: (e) => {
        e.preventDefault();
        this.onClickStep(0);
      }
    }, {
      title: 'Préparation',
      description: 'installer les moutons',
      videoRight:this.baseURL+"pyramid.mp4",
      videoLeft:this.baseURL+"tikal.mp4",
      onClick: (e) => {
        e.preventDefault();
        this.onClickStep(1);
      }
    }, {
      title: 'Step Three',
      description: 'a completer par exemple',
      videoRight:this.baseURL+"lake.mp4",
      videoLeft:this.baseURL+"lakeView.mp4",
      onClick: (e) => {
        e.preventDefault();
        this.onClickStep(2);
      }
    }, {
      title: 'Step Four',
      description: 'a completer par exemple',
      videoRight:this.baseURL+"gate.mp4",
      videoLeft:this.baseURL+"foret.mp4",
      onClick: (e) => {
        e.preventDefault();
        this.onClickStep(3);
      }
    }];
    const currentStep = steps[this.state.activeStepIndex];
    return (
      <div>
        <title>{title}</title>
        <Header headerText = {title}/>
        <TimeLine steps={steps} activeStepIndex={this.state.activeStepIndex} onClickButton = {(i) => this.onClickButton(i)}/>
          <React.Fragment>
            <video
                muted
                src={currentStep.videoLeft}
                preload={'auto'}
                type={'video/mp4'}
                className={[styles.videoLeft, styles.video].join(' ')}
                ref={this.videoL}
                //onLoadedData={() => this.setState({isLoadingL: false})}
                onCanPlayThrough={() => this.setState({waitedVideo : this.state.waitedVideo - 1})}
                onEnded={() => this.setState({waitedVideo : this.state.waitedVideo - 1})}>
            </video>
            <video
                muted
                src={currentStep.videoRight}
                preload={'auto'}
                type={'video/mp4'}
                className={[styles.videoLeft, styles.video].join(' ')}
                ref={this.videoR}
                //onLoadedData={() => console.log('rightReady')}
                onCanPlayThrough={() => this.setState({waitedVideo : this.state.waitedVideo - 1})}
                onEnded={() => this.setState({waitedVideo : this.state.waitedVideo - 1})}>
            </video>
        </React.Fragment>


      </div>
    )
  };
}

export default Comprendre


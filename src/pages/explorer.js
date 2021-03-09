import React from 'react';
import Header from '../components/header.js';
import  World from '../world/world';
import styles from "./explorer.module.css";
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from 'react-icons/md';


class ThreeScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLooping : true,
      goToButtons: [],
    };
  };


  toogleLoop = () => {
    this.setState((prevState) => ({isLooping: !prevState.isLooping}));
    this.state.isLooping? this.world.stop() : this.world.start();
  };


  resetCam = () => {
    this.world.resetCam();
  };

  gotTo = (i) => {
    this.world.gotTo(this.state.isLooping, i);
  };

  renderGoToButtons() {
    let buttons = []
    for (const poi of this.world.pois) {
      buttons.push(<button key={poi.uuid} id={poi.name} className = {styles.btn}  onClick={() => this.gotTo(poi)}>{poi.buttonName}</button>);
      // this.setState(prevState => ({
      //   goToButton: [...prevState.goToButton, <button key={poi.uuid} id={poi.name} className = {styles.btn}  onClick={() => this.gotTo(0)}>{poi.name}</button>]
      // }))
    };
    this.setState({ goToButtons: buttons });
  }

  async componentDidMount() {
    const sceneContainer = document.querySelector('#scene-container');
    this.world = new World(sceneContainer);
    await this.world.init();//#TODO error handling with async react app
    this.world.start();
    this.renderGoToButtons();
  };

  render() {
    return (
        <div className={styles.controlsWrapper}>
          <button id={styles.toggle} className = {styles.btn} onClick={this.toogleLoop}>{this.state.isLooping ? <MdPause/> : <MdPlayArrow/>}</button>
          <button id="resetCam" className = {styles.btn}  onClick={this.resetCam}>vue d'ensemble</button>
          {this.state.goToButtons}
        </div>
    );
  }
}


function Explorer() {
  const title = 'Explorer en 3D le pressoir long-fut du musée';
  return (
    <div>
      <title>{title}</title>
      <Header headerText = {title}/>
      <div className={styles.sceneContainer} id='scene-container'></div>
      <ThreeScene/>
      <div className={styles.infoWrapper}>
        null
      </div>

    </div>
  )
}


export default Explorer
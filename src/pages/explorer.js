import React from 'react';
import Header from '../components/header.js';
import Container from "../components/container";
import { Link } from "gatsby"
import  World from '../world/world';
import styles from "./explorer.module.css";

class ThreeScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLooping : true,
    };
  };


  toogleLoop = () => {
    this.setState((prevState) => ({isLooping: !prevState.isLooping}));
    this.state.isLooping? this.world.stop() : this.world.start();
  };


  resetCam = () => {
    this.world.resetCam();
  };

  gotTo = () => {
    this.world.gotTo(this.state.isLooping);
  };

  printCamPos = () => {
    this.world.printCamPos();
  }

  async componentDidMount() {
    const sceneContainer = document.querySelector('#scene-container');
    this.world = new World(sceneContainer);
    await this.world.init();//#TODO error handling with async react app
    this.world.start();
  };

  render() {
    return (
        <div className={styles.controlsWrapper}>
          <button id={styles.toggle} className = {styles.btn} onClick={this.toogleLoop}>{this.state.isLooping ? 'stop' : ' run  '}</button>
          <button id="resetCam" className = {styles.btn}  onClick={this.resetCam}>reset camera</button>
          <button id="gotTo" className = {styles.btn}  onClick={this.gotTo}>go to</button>
          
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

    </div>
  )
}


export default Explorer
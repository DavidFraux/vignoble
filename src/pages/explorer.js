import React from 'react';
import Header from '../components/header.js';
import  World from '../world/world';
import {
  goToMarkerControl,
  controlsWrapper,
  togglePlayPause,
  sceneContainer,
  slidePane, } from "./explorer.module.css";
import { MdPause, MdPlayArrow, } from 'react-icons/md';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import couchagePict from '../images/couchage.jpg';
import tonneauPict from '../images/tonneau.jpg';
import aiguillePict from '../images/aiguille.jpg';
import barrePict from '../images/barre.jpg';


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

  goTo = (poiId) => {
    this.world.goTo(this.state.isLooping, poiId);
    this.props.triggerPane(poiId);
  };

  renderGoToButtons() {
    let buttons = []
    for (const id in this.props.poisData) {
      const poiData = this.props.poisData[id];
      buttons.push(
        <button 
          key={id} 
          id={poiData.name} 
          className = {goToMarkerControl}  
          onClick={() => this.goTo(id)}>
          {poiData.buttonName ? poiData.buttonName : poiData.name}
        </button>
        );
    };
    return(buttons)
  }

  handleClickedPoi(poiId) {
    this.world.goTo(this.state.isLooping, poiId);
    this.props.triggerPane(poiId);
  }

  async componentDidMount() {
    const callback = (clickedPoiId) => {
      this.handleClickedPoi(clickedPoiId)
    };
    const sceneContainer = document.querySelector('#scene-container');
    this.world = new World(sceneContainer, this.props.poisData, callback);
    await this.world.init();//#TODO error handling with async react app
    this.world.start();
  };

  render() {
    return (
      <div className={controlsWrapper}>
        <button className = {togglePlayPause} onClick={this.toogleLoop}>{this.state.isLooping ? <MdPause size='1.5x'/> : <MdPlayArrow size='1.5x'/>}</button>
        <button className = {goToMarkerControl}  onClick={this.resetCam}>vue d'ensemble</button>
        {this.renderGoToButtons()}
      </div>
    );
  }
}




class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      currentPoiId : 'tonneau',
    };
    this.poisData = {
      //point of interest with position to be created in the 3D wiew
      'tonneau': {
        name: 'tonneau',
        position: [1.16, 0.5, -3.2],
        shortDescription: 'description courte du tonneau',
        content: 'texte sur ce point d\'interet. En quelques lignes. A rédiger. Sachant que les point point restente encore à définir',
        image: tonneauPict,
      },
      'couchage': {
        name: 'couchages',
        position: [3.55, 1.43, -1.54],
        shortDescription: 'description courte du couchage',
        content: 'texte sur ce point d\'interet. Attention il faut définir les points d\'interet  et ce qu\'on raconte à leur propos',
        image: couchagePict,
      },
      'vis': {
        name: 'vis et barre',
        position: [4.1, 1, -4.76],
        shortDescription: 'description courte de la vis',
        content: 'texte sur ce point d\'interet. Rappel: les points restent à définir',
        image: barrePict,
      },
      'aiguille':{
        name: 'aiguilles',
        position: [3.64, 2, -0.31],
        shortDescription: 'description courte des aiguilles',
        content: 'texte sur ce point d\'interet. Toujours pas définis... qu\'est ce qu\'on montre?',
        image: aiguillePict,
      },
    };
  };



  triggerPane = (poiId) => {
    this.setState({ 
      isPaneOpen: true,
      currentPoiId: poiId,
    });
  }

  render() {
    const title = 'Explorer en 3D le pressoir long-fut du musée';
    const currentPoi = this.poisData[this.state.currentPoiId];
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header headerText = {title}/>
        <div className={sceneContainer} id='scene-container'></div>
        <ThreeScene 
          poisData = {this.poisData} 
          triggerPane = {(poiId) => this.triggerPane(poiId)} 
        />

        <SlidingPane 
          className={slidePane}
          isOpen={this.state.isPaneOpen}
          title={currentPoi.name}
          subtitle={currentPoi.shortDescription}
          width="400px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ isPaneOpen: false });
          }}
          >
          <div>{currentPoi.content}</div>
          <img alt = {currentPoi.name} src = {currentPoi.image}/>
        </SlidingPane>
      </React.Fragment>
    )
  }
}


export default Explorer
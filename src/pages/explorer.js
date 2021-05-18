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
      currentPoiId : 'barrique',
    };
    this.poisData = {
      //point of interest with position to be created in the 3D wiew
      'barrique': {
        name: 'La barrique',
        position: [1.16, 0.5, -3.2],
        shortDescription: 'Barrique en bois',
        content: `Le moût n'a été en contact qu'avec des parties en bois : c'est nécessaire pour sa qualité. Le contact avec du métal pourrait produire de l'oxyde ferrique.`,
        image: tonneauPict,
      },
      'ecrou': {
        name: 'La vis et l\'écrou',
        position: [4.25, 2.6, -4.62],
        shortDescription: 'La vis et l\'écrou chantent sous l\'effort',
        content: `En action, chargé, le pressoir "parle" lorsque la vis en bois tourne : elle frotte sur l'écrou. Chaque pressoir a une vis, un écrou et donc une "voix" différente.`,
        image: couchagePict,
      },
      'vis': {
        name: 'La vis et la barre',
        position: [4.1, 1, -4.76],
        shortDescription: 'La dernière vis en bois',
        content: `La vis en bois est soumise à de fortes pressions de torsion. C\'est pourquoi on utilise du cormier, du frêne ou du chataignier comme ici.
        La vis peut casser : progressivement les vis en bois sont remplacées par des pièces en métal.
        Le pressoir du musée est le dernier à conserver sa vis en bois.
        La barre est en frene, il faut 2 hommes pour la faire tourner`,
        image: barrePict,
      },
      'chene': {
        name: 'Ensemble en chêne',
        position: [3.64, 2, -0.31],
        shortDescription: 'Les pressoirs sont construit en chêne',
        content: `Les pressoirs sont construits par des charpentiers, avec des chênes locaux. Il fallait 5 à 6 chênes pour faire un grand pressoir.`,
        image: aiguillePict,
      },
      'maie':{
        name: 'Une maie étanche',
        position: [2, 0.65, -1.5],
        shortDescription: 'La maie doit être étanche',
        content: `Les maies sont assemblées de façon précise par les charpentiers. On peut observer les marques d'assemblage.
        Avant les vendanges, ils réparent et resserrent les pièces si nécessaire.
        Ils renforcent aussi l'étanchéité des maies, en utilisant des joints en jonc ou en terre glaise.`,
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
          <text>{currentPoi.content}</text>
          <img alt = {currentPoi.name} src = {currentPoi.image}/>
        </SlidingPane>
      </React.Fragment>
    )
  }
}


export default Explorer
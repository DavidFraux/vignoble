import React from 'react';
import Header from '../components/header.js';
import { navigate } from 'gatsby'
import  World from '../3Dworld/world';
import {
  goToMarkerControl,
  controlsWrapper,
  togglePlayPause,
  sceneContainer,
  paneTextContent,
  headerCustom,} from "./explorer.module.css";
import { MdPause, MdPlayArrow, } from 'react-icons/md';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import IdleLogout from '../components/IdleLogout.js';
import Warning from '../components/logoutWarning.js';
import dataPois from "../data/pois.json";
import { render } from 'react-dom';


class ThreeScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLooping : true,
    };
  };


  toogleLoop = () => {
    this.setState((prevState) => ({isLooping: !prevState.isLooping}));
    this.state.isLooping? this.world.pausePressAnimation() : this.world.resumePressAnimation();
  };


  resetCam = () => {
    this.world.resetCam();
  };

  goTo = (poiId) => {
    this.world.goTo(poiId);
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
    return(buttons);
  }

  handleClickedPoi(poiId) {
    this.world.goTo(poiId);
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

  componentWillUnmount() {
    this.world.stop();
  }

  render() {
    return (
      <div className={controlsWrapper}>
        <button className = {togglePlayPause} onClick={this.toogleLoop}>{this.state.isLooping ? <MdPause size='1.5x'/> : <MdPlayArrow size='1.5x'/>}</button>
        <button className = {goToMarkerControl}  onClick={this.resetCam}>Vue d'ensemble</button>
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
      logoutWarning : false,
    };
    this.poisData = dataPois;
  }



  triggerPane = (poiId) => {
    this.setState({ 
      isPaneOpen: true,
      currentPoiId: poiId,
    });
  }

  handleLogout() {
    navigate('/');
  }

  handleActivate() {
    this.setState({logoutWarning : false});
  }

  handleWarning() {
    this.setState({logoutWarning : true});
    console.log("vous allez être déconnecté");
  }



  render() {
    const title = 'Explorer le long-fût du musée';
    const currentPoi = this.poisData[this.state.currentPoiId];
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header className = {headerCustom} headerText = {title}/>
        <IdleLogout 
          logoutDelay = '45' 
          logoutFunction = {() => this.handleLogout()}
          warnDelay = '30' 
          warnFunction = {() => this.handleWarning()}
          activateFunction = {() => this.handleActivate()}
          />
        <div className={sceneContainer} id='scene-container'></div>
        <ThreeScene 
          poisData = {this.poisData} 
          triggerPane = {(poiId) => this.triggerPane(poiId)} 
        />
        {this.state.logoutWarning? <Warning /> : <div/>}
        <SlidingPane 
          //className={slidePane}
          isOpen={this.state.isPaneOpen}
          title={currentPoi.name}
          subtitle={currentPoi.shortDescription}
          width="400px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ isPaneOpen: false });
          }}
          >
          <div className = {paneTextContent}>{currentPoi.content}</div>
          <img alt = {currentPoi.name} src = {currentPoi.image}/>
        </SlidingPane>
      </React.Fragment>
    )
  }
}


export default Explorer
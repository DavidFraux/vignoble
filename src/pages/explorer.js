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
  headerCustom,
  slidePane,
  waitingGrey,} from "./explorer.module.css";
import { MdPause, MdPlayArrow, } from 'react-icons/md';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import IdleLogout from '../components/IdleLogout.js';
import Warning from '../components/logoutWarning.js';
import Loading from '../components/loading.js'

async function fetchAPI (){
  const response = await fetch(`${process.env.GATSBY_API_URL}/pois`)
  //.then((res) => res.json())
  //.then((res) => {  console.log('in', res) })
  .catch((err) => {console.log(err)});
  const pois = await response.json();
  return pois;
}



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
          id={poiData.targetName} 
          className = {goToMarkerControl}  
          onClick={() => this.goTo(id)}>
          {poiData.buttonName ? poiData.buttonName : poiData.targetName}
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
      currentPoiId : null,
      logoutWarning : false,
      poisData : null,
    };
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

  componentDidMount() {
    fetchAPI().then( pois => {
      let poisObj = {}
      for (let poi of pois) {
        poisObj[poi.id] = poi
      }
      setTimeout(() => this.setState({poisData : poisObj, currentPoiId : Object.keys(poisObj)[0],}), 2500 )
    }); 
  }


  render() {
    return (
      <React.Fragment>
        <title>Explorer le long fut du musée</title>
        <Header className = {headerCustom}/>
        <IdleLogout 
          logoutDelay = '45' 
          logoutFunction = {() => this.handleLogout()}
          warnDelay = '30' 
          warnFunction = {() => this.handleWarning()}
          activateFunction = {() => this.handleActivate()}
          />
        {this.state.poisData ? 
          <React.Fragment>
            <div className={sceneContainer} id='scene-container'></div>
            <ThreeScene 
              poisData = {this.state.poisData} 
              triggerPane = {(poiId) => this.triggerPane(poiId)} 
            /> 
            {this.state.logoutWarning? <Warning /> : <div/>}
            <SlidingPane 
              className={slidePane}//background color not available option
              isOpen={this.state.isPaneOpen}
              title={this.state.poisData[this.state.currentPoiId].targetName}
              subtitle={this.state.poisData[this.state.currentPoiId].shortDescription}
              width="400px"
              onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                this.setState({ isPaneOpen: false });
              }}
              >
              <div className = {paneTextContent}>{this.state.poisData[this.state.currentPoiId].description}</div>
              <img 
                alt = {this.state.poisData[this.state.currentPoiId].image[0].alternatieText} 
                src = {process.env.GATSBY_API_URL + this.state.poisData[this.state.currentPoiId].image[0].formats.large.url}
              />
            </SlidingPane>
          </React.Fragment>
          :
          <div className = {waitingGrey}>
            <div><Loading /></div>
          </div>
        }
      </React.Fragment>
    )
  }
}


export default Explorer



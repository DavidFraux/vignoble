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
  waitingGrey,
  onScreenButtonClass} from "./explorer.module.css";
import { MdPause, MdPlayArrow, } from 'react-icons/md';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import IdleLogout from '../components/IdleLogout.js';
import Warning from '../components/logoutWarning.js';
import fetchAPI from '../components/fetchREST.js';
import OnScreenButtons from '../components/onScreenButtons.js';
import Loading from '../components/loading.js'


class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      currentPoiId : null,
      logoutWarning : false,
      poisData : null,
      isLooping : true,
    };
  }

  toggleLoop = () => {
    this.setState((prevState) => ({isLooping: !prevState.isLooping}));
    this.state.isLooping? this.world.pausePressAnimation() : this.world.resumePressAnimation();
  };


  resetCam = () => {
    this.world.resetCam();
  };

  goTo = (poiId) => {
    this.world.goTo(poiId);
    this.triggerPane(poiId);
  };

  renderGoToButtons() {
    let buttons = []
    for (const id in this.state.poisData) {
      const poiData = this.state.poisData[id];
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
    this.triggerPane(poiId);
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

  async componentDidMount() {
    const callback = (clickedPoiId) => {
      this.handleClickedPoi(clickedPoiId)
    };
    const sceneContainer = document.querySelector('#scene-container');
    const [ apiPois, api3dAssets ] = await Promise.all([
      fetchAPI('pois'),
      fetchAPI('3-d-assets'),
    ]);
    let 
      poisObj = {},
      assetsObj = {};
    for (let poi of apiPois) {
      poisObj[poi.id] = poi
    };
    for (let asset of api3dAssets) {
      assetsObj[asset.directID] = asset
    }
    //if too fast but flashing: bad sensation: better waiting a bit
    setTimeout(() => this.setState({poisData : poisObj, currentPoiId : Object.keys(poisObj)[0],}), 800 )
    const pressURL = process.env.GATSBY_API_URL + assetsObj['long-fut'].glbfile.url;
    this.world = new World(sceneContainer, poisObj, callback);
    this.world.init(pressURL).then ( this.world.start() ).catch((err) => { console.log(err); alert('ERROR : 3D model cannot load')});
  }

  componentWillUnmount() {
    this.world.stop();
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
        <div className={sceneContainer} id='scene-container'>
          {this.state.logoutWarning? <Warning /> : <div/>}
          {this.state.poisData ?
            <React.Fragment>
              <div className={controlsWrapper}>
                <button className = {togglePlayPause} onClick={this.toggleLoop}>{this.state.isLooping ? <MdPause size='1.5x'/> : <MdPlayArrow size='1.5x'/>}</button>
                <button className = {goToMarkerControl} onClick={this.resetCam}>Vue d'ensemble</button>
                {this.renderGoToButtons()}
              </div>
              {!this.state.isLooping && 
              <OnScreenButtons 
                className = {onScreenButtonClass}
                displayPrevNext={false}
                playFunction = {() => this.toggleLoop()}
                pauseFunction = {() => this.toggleLoop()}
                paused = {!this.state.isLooping}
              />
            }
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
        </div>
      </React.Fragment>
    )
  }
}


export default Explorer



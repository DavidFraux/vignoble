import React, { useEffect, useState } from 'react';
import {
  container,
  boutonsBox,
  bouton,
  prevBouton,
  nextBouton,
  centralBouton,
  boutonPict,
} from './onScreenButtons.module.css';
import prevPict from "../images/prev.svg";
import nextPict from "../images/next.svg";
import playPict from "../images/play.svg";
import replayPict from "../images/replay.svg";
import pausePict from "../images/pause.svg";


//const template for the boutons: play pause replay prev next
const Bouton = props => (
  <div role = 'button' tabIndex = {0} className = {`${props.classe} ${bouton}`} onClick={() => props.onclick()} >
      <img className = {boutonPict} src={props.picture} alt={props.altText} />
  </div>
)



const OnScreenButtons = (props) => {
  // const [signoutTime, setSignoutTime] = useState(props.logoutDelay*1000);
  // const [warningTime, setWarningTime] = useState(props.warnDelay*1000);
  // let warnTimeout;
  // let logoutTimeout;

  // pour pasApas et film trigger aussi un idleLogout
  return (
    <div className = {container}>
      <div className = {boutonsBox}>
        {props.displayPrevNext &&
          <React.Fragment>
            <Bouton
              altText = 'previous'
              onclick = {() => props.prevFunction()} 
              classe = {prevBouton}  
              picture = {prevPict} />
            <Bouton
              altText = 'next'
              onclick = {() => props.nextFunction()} 
              classe = {nextBouton}  
              picture = {nextPict} />
          </React.Fragment>
        }
        {props.ended ?//if ended offer to reload
          <Bouton
          altText = 'replay'
          onclick = {() => props.replayFunction()} 
          classe = {centralBouton}  
          picture = {replayPict} />
          :
          (props.paused ? //if not ended and paused offer to play
            <Bouton
            altText = 'play'
            onclick = {() => props.playFunction()} 
            classe = {centralBouton}  
            picture = {playPict} />
            ://if not ended and playing offer to pause
            <Bouton
            altText = 'pause'
            onclick = {() => props.pauseFuntion()} 
            classe = {centralBouton}  
            picture = {pausePict} />)
        }
      </div>
    </div>
  )
}

OnScreenButtons.defaultProps = {
  displayPrevNext: false,

}

export default OnScreenButtons;
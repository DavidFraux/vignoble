import React from 'react';
import { render } from 'react-dom';
import {
  wrapper,
  text,
  progress,
  left, 
  center, 
  right,
  bounding} from './logoutWarning.module.css'


function Warning() {
  return(
    <div classNameName = {wrapper}>
      <div classNameName = {text}>Si aucune action sur l'écran n'est produite, vous allez prochainement être redirigé vers l'accueil</div>
      <div className={progress}>
      <div className={bounding}></div>
        <div className={left} ></div>
        <div className={center} ></div>
        <div className={right} ></div>
      </div>
    </div>
  )
} 


  export default Warning
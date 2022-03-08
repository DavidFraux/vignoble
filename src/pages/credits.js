import React from 'react';
import Header from '../components/header.js';
import {
  background,
  mainTitle,
  container,
  noun,
  affiliation,
  task } from './credits.module.css';
import logoPict from '../images/LOGO-MUSEE.png'
import { Helmet } from "react-helmet"


function Home() {
  return (
    <React.Fragment>
      <title>Crédits</title>
      <Header />

      <div className = {background}/>
      <div className = {mainTitle}>
        <div>CRÉDITS</div>
        <div>contributeurs et contributrices</div>
      </div>
      <div className = {container}>
        <div className = {affiliation}> 
          <ul>
            <p>École Centrale de Nantes</p>
            <p>École Centrale de Nantes</p>
          </ul>
        </div>
        <div className = {noun}> 
          <ul>
            <p>Matthieu Quantin</p>
            <p>Florent Laroche</p>
          </ul>
        </div>
        <div className = {task}> 
          <ul>
            <p>Développement de l'application et modélisation 3D</p>
            <p>Coordination de projet</p>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
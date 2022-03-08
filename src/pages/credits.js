import React from 'react';
import Header from '../components/header.js';
import {
  background,
  mainTitle,
  container,
   } from './credits.module.css';
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
        
      </div>
    </React.Fragment>
  )
}

export default Home
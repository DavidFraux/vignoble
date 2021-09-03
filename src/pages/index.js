import React from 'react';
//import Image from "../components/image.js"
import { navigate } from "gatsby"
import {
  acces,
  accesPict,
  accesText,
  accesSubText,
  accessDuration,
  background,
  logo,
  pub,
  container,
  pasApas,
  film,
  explorer, 
  savoirPlus} from './index.module.css'
import filmPict from '../images/logoFilm.svg'
import explorerPict from '../images/logo3D.svg'
import pasApasPict from '../images/logopasApas.svg'
import logoPict from '../images/LOGO-MUSEE.png'
import { GiDuration } from 'react-icons/gi';


const Acces = props => (
    <div role = 'button' tabIndex = {0} className = {`${props.classe} ${acces}`} onClick={() => navigate(props.to)} >
        <img className = {accesPict} src={props.picture} alt={props.text} />
        <div className = {accesText}> {props.text} </div>
        <div className = {accesSubText}> {props.subtext} </div>
        <div className = {accessDuration}> <GiDuration/> {props.duration} </div>
  </div>
)

function Home() {
  return (
    <React.Fragment>
    <div className = {background}/>
    <img  className = {logo} src={logoPict} alt='logo musée' />
    <p className = {pub}>COMPRENDRE LES PRESSOIRS</p>
    <div className = {container}>
      <Acces 
        to = '/pasApas/' 
        classe = {pasApas}  
        text = "Pas à pas" 
        subtext = 'Le fonctionnement du long-fût' 
        duration = " 12 minutes" 
        picture = {pasApasPict} />
      <Acces 
        to = '/film/' 
        classe = {film} 
        text = "Voir le film" 
        subtext = {`Un pressurage avec un long-fût`}
        duration = " 8 minutes"
        picture = {filmPict}/>
      <Acces 
        to = '/explorer/'
        classe ={explorer}
        text = "Explorer en 3D"
        subtext = 'Les anecdotes du long-fût'
        duration = " 5 minutes"
        picture = {explorerPict}/>
    </div>
    <button className = {savoirPlus}  onClick={() => navigate('/savoirPlus')}>En savoir plus</button>
    
    </React.Fragment>
  )
}

export default Home
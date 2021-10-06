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
  savoirPlus, 
  marianne, } from './index.module.css'
import filmPict from '../images/logoFilm.svg'
import explorerPict from '../images/logo3D.svg'
import pasApasPict from '../images/logopasApas.svg'
import marianeMCpict from '../images/marianneMC.jpg'
import logoPict from '../images/LOGO-MUSEE.png'
import {GiDuration} from 'react-icons/gi';
import { Helmet } from "react-helmet"

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
    <Helmet>
        <meta charSet="utf-8" />
        <title>Vignoble app</title>
    </Helmet>
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
    <button className = {savoirPlus}  onClick={() => navigate('/savoirPlus')}>Découvrir plus</button>
    <div className = {marianne}>
      <img src = {marianeMCpict} alt= 'logo ministère français de la culture' />
      <div>
        <div> Avec le soutien de l’Etat </div>
        <div> Direction régionale des affaires culturelles des Pays de la Loire</div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default Home
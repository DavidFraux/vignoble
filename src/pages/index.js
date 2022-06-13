import React from 'react';
//import Image from "../components/image.js"
import { navigate } from "gatsby"
import {
  acces,
  accesPict,
  accesText,
  accesTitle,
  accesSubtitle,
  accessDuration,
  background,
  logo,
  mainTitle,
  container,
  pasApas,
  film,
  explorer, 
  savoirPlus, 
  credits,
  marianePict,
  marianeText,
  creditText } from './index.module.css'
import filmPict from '../images/logoFilm.svg'
import explorerPict from '../images/logo3D.svg'
import pasApasPict from '../images/logopasApas.svg'
import marianeMCpict from '../images/marianneMC.jpg'
import logoPict from '../images/LOGO-MUSEE.png'
import {GiDuration} from 'react-icons/gi'
import { Helmet } from "react-helmet"

const Acces = props => (
    <div role = 'button' tabIndex = {0} className = {`${props.classe} ${acces}`} onClick={() => navigate(props.to)} >
        <img className = {accesPict} src={props.picture} alt={props.title} />
        <div className = {`${accesText} ${accesTitle}`    }> {props.title}                  </div>
        <div className = {`${accesText} ${accesSubtitle}` }> {props.subtitle}               </div>
        <div className = {`${accesText} ${accessDuration}`}> <GiDuration/> {props.duration} </div>
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
    <p className = {mainTitle}>COMPRENDRE LES PRESSOIRS</p>
    <div className = {container}>
      <Acces 
        to = '/pasApas/' 
        classe = {pasApas}  
        title = "Pas à pas" 
        subtitle = {`Le fonctionnement du long\u2011fût`}//the char \u2011 is non breaking hyphen
        duration = " 12 minutes" 
        picture = {pasApasPict} />
      <Acces 
        to = '/film/' 
        classe = {film} 
        title = "Voir le film" 
        subtitle = {`Un pressurage avec un long\u2011fût`}//the char \u2011 is non breaking hyphen
        duration = " 8 minutes"
        picture = {filmPict}/>
      <Acces 
        to = '/explorer/'
        classe ={explorer}
        title = "Explorer en 3D"
        subtitle = {`Les anecdotes du long\u2011fût`}//the char \u2011 is non breaking hyphen
        duration = " 5 minutes"
        picture = {explorerPict}/>
    </div>
    <button className = {savoirPlus}  onClick={() => navigate('/savoirPlus')}>Découvrir plus</button>
    <div className = {credits} tabIndex = {2} onClick={() => navigate('/credits/')}>
      <div className = {creditText}> Crédits </div>
      <img className = {marianePict} src = {marianeMCpict} alt= 'logo ministère français de la culture' />
      <div className = {marianeText}>
        <div> Avec le soutien de l’Etat </div>
        <div> Direction régionale des affaires culturelles des Pays de la Loire</div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default Home
import React from 'react';
//import Image from "../components/image.js"
import { navigate } from "gatsby"
import {
  link,
  pictlink,
  overlay,
  background,
  logo,
  pub,
  container,
  comprendre,
  film,
  explorer, } from './index.module.css'
import filmPict from '../images/film.png'
import explorerPict from '../images/explorer.png'
import comprendrePict from '../images/comprendre.png'
import logoPict from '../images/LOGO-MUSEE.png'

const ShapeLink = props => (
    <div role = 'button' tabIndex = {0} className = {`${props.classe} ${link}`} onClick={() => navigate(props.to)} >
        <img  className = {pictlink} src={props.picture} alt={props.text} />
  </div>
)

function Home() {
  return (
    <React.Fragment>
    <div className = {overlay}/>
    <div className = {background}/>
    <img  className = {logo} src={logoPict} alt='logo musée' />
    <p className = {pub}>Le pressoir long-fut <br/> 1848</p>
    <div className = {container}>
      <ShapeLink to = '/comprendre/' classe = {comprendre}  text = "comprendre" picture = {comprendrePict} />
      <ShapeLink to = '/film/' classe = {film} text = "film"  picture = {filmPict}/>
      <ShapeLink to = '/explorer/' classe ={explorer} text = "explorer"  picture = {explorerPict}/>
    </div>
    
    </React.Fragment>
  )
}

export default Home
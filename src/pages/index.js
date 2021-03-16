import React from 'react';
//import Image from "../components/image.js"
import { Link, navigate } from "gatsby"
import styles from './index.module.css'
import filmPict from '../images/film.png'
import explorerPict from '../images/explorer.png'
import comprendrePict from '../images/comprendre.png'
import logo from '../images/LOGO-MUSEE.png'

const ShapeLink = props => (
    <div className = {`${props.classe} ${styles.link}`} onClick={() => navigate(props.to)} >
        <img  className = {styles.pictlink} src={props.picture} alt={props.text} />
  </div>
)

function Home() {
  return (
    <React.Fragment>
    <div className = {styles.overlay}/>
    <div className = {styles.background}/>
    <img  className = {styles.logo} src={logo} alt='logo musée' />
    <p className = {styles.pub}>Le pressoir long-fut <br/> 1848</p>
    <div className = {styles.container}>
      <ShapeLink to = '/comprendre/' classe = {styles.comprendre}  text = "comprendre" picture = {comprendrePict}/>
      <ShapeLink to = '/film/' classe = {styles.film} text = "film"  picture = {filmPict}/>
      <ShapeLink to = '/explorer/' classe ={styles.explorer} text = "explorer"  picture = {explorerPict}/>
    </div>
    
    </React.Fragment>
  )
}

export default Home
import React from 'react';
//import Image from "../components/image.js"
import { Link } from "gatsby"
import styles from './index.module.css'
import Img from "gatsby-image"
import filmPict from '../images/film.png'
import threePict from '../images/3D.png'
import longFutPict from '../images/longFut.png'

const ShapeLink = props => (
  <div>
    
    <div className = {styles.contentLink} id = {props.contentID}>
      <div className = {styles.retrocentered}>
        <p style = {{ textAlign: `center` }}>{props.text}</p>
        <img  src={props.picture} alt="" />
      </div>
    </div>
    <Link className = {styles.shapeLink} id = {props.shapeID} to={props.to}></Link>
  </div>
)

function Home() {
  const title = 'splited page';
  return (
    <div className = {styles.container}>
      <ShapeLink to = '/comprendre/' shapeID = {styles.aboutShape} contentID = {styles.aboutContent} text = 'Comprendre le fonctionnement du pressoir' picture = {longFutPict}/>
      <ShapeLink to = '/film/' shapeID={styles.homeShape} contentID = {styles.homeContent} text = 'Voir le film' picture = {filmPict}/>
      <ShapeLink to = '/explorer/' shapeID={styles.contactShape} contentID = {styles.contactContent}text = 'Explorer le pressoir' picture = {threePict}/>
    </div>
  )
}

export default Home

{/* <ShapeLink to = '/comprendre/' shapeID = {styles.aboutShape} contentID = {styles.aboutContent} text = 'Comprendre le fonctionnement du pressoir' picture = {longFutPict}/>
<ShapeLink to = '/film/' shapeID={styles.homeShape} contentID = {styles.homeContent} text = 'Voir le film' picture = {filmPict}/>
<ShapeLink to = '/explorer/' shapeID={styles.contactShape} contentID = {styles.contactContent}text = 'Explorer le pressoir' picture = {threePict}/> */}
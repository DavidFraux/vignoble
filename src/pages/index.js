import React from 'react';
//import Image from "../components/image.js"
import { Link } from "gatsby"
import pageStyles from './home.module.css'
import Img from "gatsby-image"
import filmPict from '../images/film.png'
import threePict from '../images/3D.png'
import longFutPict from '../images/longFut.png'

const ShapeLink = props => (
  <div>
    
    <div className = {pageStyles.contentLink} id = {props.contentID}>
      <div className = {pageStyles.retrocentered}>
        <p style = {{ textAlign: `center` }}>{props.text}</p>
        <img  src={props.picture} alt="" />
      </div>
    </div>
    <Link className = {pageStyles.shapeLink} id = {props.shapeID} to={props.to}></Link>
  </div>
)

function Home() {
  const title = 'splited page';
  return (
    <div>
      <title>{title}</title>
      
      <div>
        <ShapeLink to = '/comprendre/' shapeID = {pageStyles.aboutShape} contentID = {pageStyles.aboutContent} text = 'Comprendre le fonctionnement du pressoir' picture = {longFutPict}/>
        <ShapeLink to = '/film/' shapeID={pageStyles.homeShape} contentID = {pageStyles.homeContent} text = 'Voir le film' picture = {filmPict}/>
        <ShapeLink to = '/explorer/' shapeID={pageStyles.contactShape} contentID = {pageStyles.contactContent}text = 'Explorer le pressoir' picture = {threePict}/>
      </div>
    </div>
  )
}

export default Home
import React from "react"
import { graphql } from 'gatsby'
import Header from '../components/header.js';
import Container from "../components/container"
//import foot from 
//"https://uncloud.univ-nantes.fr/index.php/s/eDbiTdnr9AeZaaL/download"
//"https://uncloud.univ-nantes.fr/remote.php/dav/files/quantin-m-1/Mes Documents/wwwDataVignoble/foot.mp4"


function Film({ data }) {
  const title = 'Le film';
  const foot = data.site.siteMetadata.mediaBaseURL+"foot.mp4"
  return (
  <div>
    <title>{title}</title>
    <Header headerText = {title}/>
    <Container>
      <p>Hello Gatsby</p>
      <p>{data.site.siteMetadata.title}</p>
      <p>What a nice day</p>
      <img  src="https://source.unsplash.com/random/400x200" alt="" />
      <video autoPlay loop muted src={foot}/>
    </Container>
  </div>
  )
}

export const query = graphql `
  query {
    site {
      siteMetadata {
        title
        mediaBaseURL
      }
    }
  }
`



export default Film


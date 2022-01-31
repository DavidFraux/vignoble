import React from "react"
import Header from '../components/header.js';
import Container from "../components/container"



function Page404() {
  const title = '404 page';
  return (
  <div>
    <title>{title}</title>
    <Header headerText = {title}/>
    <Container>
      <p>error 404 : Cette page n'existe pas</p>
      <p>vous avez des idées pour le musée du vignoble, contactez nous</p>
      <p>accueil@musee-vignoble-nantais.fr</p>
    </Container>
  </div>
  )
}

export default Page404
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
      <p>This page doesn't exist</p>
      <p>What a nice day anyway</p>
    </Container>
  </div>
  )
}

export default Page404
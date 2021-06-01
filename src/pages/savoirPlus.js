import React from "react"
import Header from '../components/header.js';
import Container from "../components/container"



function savoirPlus() {
  const title = 'En savoir plus';
  return (
  <div>
    <title>{title}</title>
    <Header headerText = {title}/>
    <Container>
      <p>Pour en savoir plus vous êtes sur la bonne page</p>
      <p>mais que contient cette page au fait? </p>
    </Container>
  </div>
  )
}

export default savoirPlus
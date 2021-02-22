import React from 'react';
import Header from '../components/header.js';
import Container from "../components/container";
import { Link } from "gatsby"


function Explorer() {
  const title = 'Explorer en 3D le pressoir long-fut du musée';
  return (
    <div>
      <title>{title}</title>
      <Header headerText = {title}/>
      <Container>
        <p>Mat</p>
        <p>send us a message</p>
        <p>fgergerger</p>explorer
      </Container>

    </div>
  )
}

export default Explorer
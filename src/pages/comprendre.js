import React from 'react';
import Header from '../components/header.js';
import styles from './comprendre.module.css'
import Container from "../components/container";
import TimeLine from "../components/timeLine";


//Generally, if you use a component in multiple places on a site,
//it should be in its own module file in the components directory.
//But, if it’s used only in one file, create it inline.
const User = (props) => (
  <div className = {styles.user}>
    <img alt='avatar' src={props.avatar} className = {styles.avatar}/>
    <div className = {styles.description}>
      <h2 className = {styles.username}>{props.username}</h2>
      <p className = {styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

const steps = [{
  title: 'Fouler',
  description: 'fouler le raisin dans la maie, basse ou haute',
  onClick: (e) => {
    e.preventDefault();
    this.onClickStep(0);
  }
}, {
  title: 'Préparation',
  description: 'installer les moutons',
  onClick: (e) => {
    e.preventDefault();
    this.onClickStep(1);
  }
}, {
  title: 'Step Three',
  description: 'a completer par exemple',
  onClick: (e) => {
    e.preventDefault();
    this.onClickStep(2);
  }
}, {
  title: 'Step Four',
  description: 'a completer par exemple',
  onClick: (e) => {
    e.preventDefault();
    this.onClickStep(3);
  }
}];

function Comprendre() {
  const title = 'Comprendre le fonctionnement du pressoir long-fut';
  return (
    <div>
      <title>{title}</title>
      <Header headerText = {title}/>
      <TimeLine steps={steps}/>
      <Container>
        <p>CSS module are chouettes</p>
        <User 
          username="Maria Randall"
          avatar="https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/docs/tutorial/part-two/pexels-daniel-xavier-1102341.jpg"
          excerpt="I'm Maria Randall. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        />
        <User
          username="Daniela Dewitt"
          avatar="https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/docs/tutorial/part-two/pexels-guilherme-almeida-1858175.jpg"
          excerpt="I'm Daniela Dewitt. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        />
        <User
          username = 'matmat inHere'
          avatar = 'https://www.ls2n.fr/wp-content/plugins/annuaireLS2N/img/neutral_avatar.png'
          excerpt = "I'm matmat and I'm learnning this"
        />
      </Container>
    </div>
  )
}

export default Comprendre
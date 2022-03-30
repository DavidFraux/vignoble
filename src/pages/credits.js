import React from 'react';
import { useState, useEffect } from "react";
import Header from '../components/header.js';
import {
  background,
  mainTitle,
  container,
  noun,
  affiliation,
  task } from './credits.module.css';
import fetchAPI from '../components/fetchREST.js';

const Contributor = props => (
  <tr>
    <td className = {affiliation} >{props.affiliation}</td>
    <td className = {noun} >{props.noun}</td>
    <td className = {task}>{props.task}</td>
  </tr>
  )

function Credit() {
  const [people, setPeople] = useState();
  useEffect(() => {
    fetchAPI('creditedpeople')
    .then(data => {
        const contributors = [];
        data.sort((a, b) => a.appearOrder - b.appearOrder);
        for (const contributor of data){
          console.log(contributor);
          contributors.push(<Contributor affiliation={contributor.affiliation} noun = {contributor.noun} task = {contributor.task}/>);
        }
        setPeople(contributors);
      })
    }, []);
     
  return (
    <React.Fragment>
      <title>Crédits</title>
      <Header />

      <div className = {background}/>
      <div className = {mainTitle}>
        <div>CRÉDITS</div>
        <div>contributeurs et contributrices</div>
      </div>
      <div className = {container}>
        <table>
          {/* ME, HARD CODED */}
          <tr>
            <td className = {affiliation} >Laboratoire LS2N, Nantes Université, École Centrale Nantes</td>
            <td className = {noun} >Matthieu Quantin</td>
            <td className = {task}>Développement de l'application et modélisation 3D</td>
          </tr>
          {/* OTHER PEOPLE CREDITED FROM API DATA */}
          {people}
        </table>
      </div>
    </React.Fragment>
  )
}

export default Credit




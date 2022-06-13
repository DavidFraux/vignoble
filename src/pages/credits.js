import React from 'react';
import { useState, useEffect } from "react";
import Header from '../components/header.js';
import {
  background,
  mainTitle,
  container,
  noun,
  affiliation,
  task,
  logo } from './credits.module.css';
import logoECN from '../images/Centrale_Nantes_Logo.svg'
import fetchAPI from '../components/fetchREST.js';

const Contributor = props => (
  <tr>
    {/* <td className = {affiliation} >{props.affiliation}</td> */}
    
    <td className = {noun} >{props.noun}</td>
     <td className= {logo} > {props.logo && <img src={process.env.GATSBY_API_URL + props.logo.url} alt={props.affiliation} />} </td>
    <td className = {task}>{props.task}</td>
  </tr>
  )

function Credit() {
  const [people, setPeople] = useState();
  useEffect(() => {
    fetchAPI('creditedpeople')
    .then(data => {
        const contributors = [];
        data.map(a => {a.appearOrder ??= 999} );//if no appearOrder is specified, it's at the bottom
        data.sort((a, b) => a.appearOrder - b.appearOrder);
        for (const contributor of data){
          contributors.push(<Contributor key={contributor.id} {...contributor}/>);
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
        <tbody>
          {/* ME, HARD CODED */}
          <tr key="matthieuQuantin">
            {/* <td className = {affiliation} >Laboratoire LS2N, Nantes Université, École Centrale Nantes</td> */}
            
            <td className = {noun} >Matthieu Quantin</td>
            <td className={logo}> <img src={logoECN} alt="logo ECN"/></td>
            <td className = {task}>Développement de l'application et modélisation 3D</td>
          </tr>
          {/* OTHER PEOPLE CREDITED FROM API DATA */}
          {people}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default Credit




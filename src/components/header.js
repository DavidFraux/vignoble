import React from "react"
import { Link } from "gatsby"
import headerStyles from './header.module.css'
import { MdHome } from 'react-icons/md';


const ListLink = props => (
    <Link className = {headerStyles.linkPage} to={props.to}>{props.children}</Link>
)

const Arrow = props => (
  <svg class= {headerStyles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.68 38.73"><polygon points="0 0 147.98 0 167.68 19.3 148.52 38.73 0 38.73 19.03 19.36 0 0" fill={props.color}/></svg>
)

function Header(props) {
  return (
    <header>
      <div className = {headerStyles.topBar}>
        <Link  className = {headerStyles.siteName} to = '/'><MdHome/></Link>
        <div className = {headerStyles.navigationSide}>
          {props.headerText}       
        </div>
        
      </div>
      

    </header>
  )
}

export default Header


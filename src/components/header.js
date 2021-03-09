import React from "react"
import { Link } from "gatsby"
import headerStyles from './header.module.css'
import { MdHome } from 'react-icons/md';


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


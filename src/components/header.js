import React from "react"
import { Link } from "gatsby"
import {
  topBar,
  siteName,
  navigationSide,
} from './header.module.css'
import { MdHome } from 'react-icons/md';


function Header(props) {
  return (
    <header>
      <div className = {topBar}>
        <Link  className = {siteName} to = '/'><MdHome/></Link>
        <div className = {navigationSide}>
          {props.headerText}
        </div>
        
      </div>
      

    </header>
  )
}

export default Header


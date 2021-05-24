import React from "react"
import { navigate } from "gatsby"
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
        <div className = {siteName} onClick={() => navigate('/')}><MdHome/></div>
        <div className = {navigationSide}>
          {props.headerText}
        </div>
        
      </div>
      

    </header>
  )
}

export default Header


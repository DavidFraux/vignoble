import React from 'react';
import {ldsRipple, ldsRippleLine, ldsRippleLineDark} from './loading.module.css'

function Loading(props) {
  const useClass = props.dark ? ldsRippleLineDark : ldsRippleLine
  return(
    <div className={ldsRipple}>
      <div className={useClass}/>
      <div className={useClass}/>
    </div>
  )
} 


  export default Loading



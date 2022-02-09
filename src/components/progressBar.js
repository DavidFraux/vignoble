import React, { useState, useEffect } from "react";
import {labelClass, boxClass}  from './progressBar.module.css'

const ProgressBar = (props) => {
  const { componentClass, color, labelText, completed } = props;


  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    transition: 'width 1s linear',
    backgroundColor: color,
    borderRadius: 'inherit',
    position: 'absolute',
  }


  return (
    <div className={`${componentClass} ${boxClass}`}>
      <div className={labelClass}>{labelText}</div>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;


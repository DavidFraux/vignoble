import React, { useState, useEffect } from "react";

const ProgressBar = (props) => {
  const { componentClass, color, labelClass, labelText, completed } = props;


  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    transition: 'width 1s linear',
    backgroundColor: color,
    borderRadius: 'inherit',
    position: 'absolute',
  }


  return (
    <div className={componentClass}>
      <div className={labelClass}>{labelText}</div>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;


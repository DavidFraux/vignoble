import React, { useState, useEffect } from "react";

const ProgressBar = (props) => {
  const { componentClass, color, labelClass, labelText, completed } = props;


  const fillerStyles = {
    height: '110%',
    width: `${completed}%`,
    transition: 'width 1s linear',
    backgroundColor: color,
    borderRadius: 'inherit',
  }


  return (
    <div className={componentClass}>
      <div style={fillerStyles}>
      <span className={labelClass}>{labelText}</span>
      </div>
    </div>
  );
};

export default ProgressBar;


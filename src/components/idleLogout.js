import React, { useEffect, useState } from 'react';

const IdleLogout = (props) => {
  const [signoutTime, setSignoutTime] = useState(props.logoutDelay*1000);
  const [warningTime, setWarningTime] = useState(props.warnDelay*1000);
  let warnTimeout;
  let logoutTimeout;

  const warn = () => {
    props.warnFunction();
  };
  const logout = () => {
    props.logoutFunction();
  }

  const setTimeouts = () => {
    warnTimeout = setTimeout(warn, warningTime);
    logoutTimeout = setTimeout(logout, signoutTime);
  };

  const clearTimeouts = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
    props.activateFunction();
  };

  useEffect(() => {
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress',
      'touchstart'
    ];

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
    };

    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }

    setTimeouts();
    return () => {
      for(let i in events){
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    }
  },[]);


  return <div></div>
}

export default IdleLogout;
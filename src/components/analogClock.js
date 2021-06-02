import React from "react";
// const form = (no) => {
// 	return ((no<10) ? "0" : "")+no;
// }
import {clock,} from './analogClock.module.css'

class AnalogClock extends React.Component {
	constructor(props) {
		super(props);
		var now = new Date();
		this.state = {
			seconds: 360 * now.getSeconds() / 60,
			minutes: 360 * now.getMinutes() / 60,
			hours: 360 * (now.getHours() % 12) / 12,
			s: now.getSeconds(),
			m: now.getMinutes(),
			h: now.getHours()
		};
	}



	render() {
		return (
			<div className={clock}>
        <svg viewBox="0 0 100 100">
        <defs>
            <clipPath id="seconds">
              <rect x="49.5" y="0" width="1" height="60" fill="red">
                <animateTransform 
                  attributeName="transform" attributeType="XML"
                  type="rotate" from={`${this.state.seconds} 50,50`} to={`${this.state.seconds+360} 50,50`} dur={`${60}s`} repeatCount="indefinite">
                </animateTransform>
              </rect>
          </clipPath>
          <clipPath id="minutes">
            <rect x="49" y="0" width="2" height="60" fill="red">
                <animateTransform 
                  attributeName="transform" attributeType="XML" 
                  type="rotate" from={`${this.state.minutes} 50,50`} to={`${this.state.minutes+360} 50,50`} dur={`${60*60}s`}  repeatCount="indefinite">
                </animateTransform>				
            </rect>
          </clipPath>
          <clipPath id="hours">
            <rect x="47" y="0" width="6" height="60" fill="red">
              <animateTransform 
                attributeName="transform" attributeType="XML" 
                type="rotate" from={`${this.state.hours} 50,50`} to={`${this.state.hours+360} 50,50`} dur={`${60*60*12}s`} repeatCount="indefinite">
              </animateTransform>				
            </rect>
          </clipPath>
        </defs>
          
        <g>
          <rect id="hour" x="0" y="0" width="100" height="100" fill="black" opacity=".4" clipPath="url(#seconds)" />
          <rect id="min" x="0" y="0" width="100" height="100" fill="black" opacity=".4" clipPath="url(#minutes)" />
          <rect id="sec" x="0" y="0" width="100" height="100" fill="black" opacity=".4" clipPath="url(#hours)" />
        </g>
        <circle cx="50" cy="50" r="5" style={{"fill":"rgba(0,0,0,.94)"}} />
        <circle cx="50" cy="50" r="50" fill="rgba(0,0,0,0)" style={{"stroke":"rgba(0,0,0,.94)"}} />

        </svg>
			</div>
		)
	}
}

export default AnalogClock

//ReactDOM.render(<SVGClock />, document.querySelector('#SVGClock'))
import React from "react";
// const form = (no) => {
// 	return ((no<10) ? "0" : "")+no;
// }
import {clock,} from './analogClock.module.css'

class AnalogClock extends React.Component {
	constructor(props) {
		super(props);
    //#TODO simplify it -> not a class is needed
    //#TODO get duration of step to animate that svg clock instead of displaying the clock time
		const now = new Date();
    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();

		this.state = {
      //"180 +" because the svg rect is drawn toward the bottom, so 12h00 is shown 6h30 on the analog clock
			angleSeconds: 180 + 360 * s / 60,
			angleMinutes: 180 + 360 * m / 60,
			angleHours:   180 + 360 * (h % 12) / 12  +  360 * m / 60 / 12,
		};
	}



	render() {
    const testDate = new Date('2021-01-01T15:32:21');
    console.log(testDate);
		return (
			<div className={clock}>
        <svg viewBox="0 0 100 100">
        <defs>
            <clipPath id="seconds">
              <rect x="49.5" y="50" width="1" height="45" >
                <animateTransform 
                  attributeName="transform" attributeType="XML"
                  type="rotate" from={`${this.state.angleSeconds} 50,50`} to={`${this.state.angleSeconds+360} 50,50`} dur={`${60}s`} repeatCount="indefinite">
                </animateTransform>
              </rect>
          </clipPath>
          <clipPath id="minutes">
            <rect x="49" y="50" width="2" height="42" >
                <animateTransform 
                  attributeName="transform" attributeType="XML" 
                  type="rotate" from={`${this.state.angleMinutes} 50,50`} to={`${this.state.angleMinutes+360} 50,50`} dur={`${60*60}s`}  repeatCount="indefinite">
                </animateTransform>				
            </rect>
          </clipPath>
          <clipPath id="hours">
            <rect x="48" y="50" width="4" height="27" >
              <animateTransform 
                attributeName="transform" attributeType="XML" 
                type="rotate" from={`${this.state.angleHours} 50,50`} to={`${this.state.angleHours+360} 50,50`} dur={`${60*60*12}s`} repeatCount="indefinite">
              </animateTransform>				
            </rect>
          </clipPath>
        </defs>
          
        <g>
          <rect id="sec" width="100" height="100" fill="red" opacity=".4" clipPath="url(#seconds)" />
          <rect id="min"  width="100" height="100" fill="black" opacity=".4" clipPath="url(#minutes)" />
          <rect id="hour"  width="100" height="100" fill="black" opacity=".4" clipPath="url(#hours)" />
        </g>
        <circle cx="50" cy="50" r="3" style={{"fill":"rgba(0,0,0,.94)"}} />
        <circle cx="50" cy="50" r="49" fill="rgba(0,0,0,0)" style={{"stroke":"rgba(0,0,0,.94)"}} />
        </svg>
			</div>
		)
	}
}

export default AnalogClock

//ReactDOM.render(<SVGClock />, document.querySelector('#SVGClock'))
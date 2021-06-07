import React from "react";
// const form = (no) => {
// 	return ((no<10) ? "0" : "")+no;
// }
import {clock,} from './analogClock.module.css'

class AnalogClock extends React.Component {
	constructor(props) {
		super(props);
    //#TODO simplify it -> not a class is needed
    console.log(props.from);
    const fromTime = props.from.split(':');//should get an array [hh, mm]
    const toTime = props.to.split(':');//should get an array [hh, mm]
    const fromMin = fromTime[1];
    const fromHour = fromTime[0];
    const toMin = toTime[1];
    const toHour = toTime[0];
    this.fromAngleHour = 180 + 360 * fromHour / 12  +  360 * fromMin / 60 / 12;
    console.log(this.fromAngleHour);
    this.toAngleHour = 180 + 360 * toHour / 12  +   360 * toMin / 60 / 12;
    this.fromAngleMin = 180 + 360 * fromMin / 60;
    this.toAngleMin = 180 + 360 * toMin / 60 + 360 * (toHour-fromHour);
	}

  buildFace(){
    const centre = <circle key= "centre" cx="50" cy="50" r="3" fill="black" />;
    const tour = <circle key= "tour" cx="50" cy="50" r="49" fill="rgba(0,0,0,0)" strokeWidth="0.2" stroke= "black" opacity="1"/>;
    const fontSize = 12;
    const numero6 =  <text key= "numero6" transform="translate(45 95)" fontSize={fontSize} >6</text>;
    const numero3 =  <text key= "numero3" transform="translate(90 55)" fontSize={fontSize}>3</text>;
    const numero9 =  <text key= "numero9" transform="translate(5 55)" fontSize={fontSize}>9</text>;
    const numero12 = <text key= "numero12" transform="translate(43 15)" fontSize={fontSize}>12</text>;
    let face = [centre, tour, numero3, numero6, numero9, numero12];
    const exceptions = [12, 3, 6, 9];
    for (let i= 1; i<=12; i++){
      if(exceptions.includes(i)){continue;}
      let deg = 360/12*i;
      face.push(<rect key= {`trait ${i}`} transform={`rotate(${deg},50,50)`} x="50" y="2" width="1" height="3" opacity=".4" fill="black"/>)
    };
    return face
  }



	render() {
		return (
			<div className={clock}>
        <svg viewBox="0 0 100 100">
        <defs>
          <clipPath id="minutes">
            <rect x="49" y="50" width="2" height="42" >
                <animateTransform 
                  attributeName="transform" attributeType="XML" 
                  type="rotate" from={`${this.fromAngleMin} 50,50`} to={`${this.toAngleMin} 50,50`} dur={`10s`} fill="freeze" >
                </animateTransform>				
            </rect>
          </clipPath>
          <clipPath id="hours">
            <rect x="48" y="50" width="4" height="27" >
              <animateTransform 
                attributeName="transform" attributeType="XML" 
                type="rotate" from={`${this.fromAngleHour} 50,50`} to={`${this.toAngleHour} 50,50`} dur={`10s`} fill="freeze" >
              </animateTransform>				
            </rect>
          </clipPath>
        </defs>
          
        <g>
          <rect id="min"  width="100" height="100" fill="black" opacity=".4" clipPath="url(#minutes)" />
          <rect id="hour"  width="100" height="100" fill="black" opacity=".4" clipPath="url(#hours)" />
        </g>
        {this.buildFace()}
        
        {/* <circle cx="50" cy="50" r="3" style={{"fill":"rgba(0,0,0,.94)"}} />
        <circle cx="50" cy="50" r="49" fill="rgba(0,0,0,0)" style={{"stroke":"rgba(0,0,0,.94)"}} /> */}

        
        </svg>
			</div>
		)
	}
}

export default AnalogClock

//ReactDOM.render(<SVGClock />, document.querySelector('#SVGClock'))
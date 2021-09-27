import React, { useState, useEffect }from "react";
import {
  circleLabel,
  circlePercentage,
  circleText,
  donut,
} from './donut.module.css'

const INNERTEXT='terminé';
const INITIAL_OFFSET = 25;//because svg draws circle from the "right side" (of the screen)
const STROKEWIDTH= 2;
const STROKEWHITESPACE = 0.3;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954',// circle radius of periph=100 for easy calculations
};


const MovingArc = ({
  strokeColor,
  strokeWidth,
  innerText,
  targetPercentage,
  startPercentage,
  speed
}) => {

  const [progressBar, setProgressBar] = useState(startPercentage);
  //pace is high (slow) when there are few numbers to move on
  const pace = (101 - (targetPercentage - startPercentage)) / speed;
  
  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  const resetPercentage = () => { //happens when new values are given
    setProgressBar(startPercentage);
  };

  //prevent some blinking display on state changes delay when new values are given
  let localPercentage = ((progressBar - startPercentage) >= 0) ? (progressBar - startPercentage) : 0 ;

  useEffect(() => {//triger animation when new value is given, until progressBar reaches the target
    if (progressBar < targetPercentage && progressBar >= startPercentage) updatePercentage();
  }, [progressBar, targetPercentage]);

  useEffect(() => {//move progressBar to new given values when steps are skipped
    if (progressBar > targetPercentage || progressBar < startPercentage ) resetPercentage();
  }, [targetPercentage]);

  return (
    <React.Fragment>
        <circle
          //className={path}
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${localPercentage} ${100 - localPercentage}`}
          strokeDashoffset={INITIAL_OFFSET-startPercentage}
        />

        <g className={circleLabel}>
          <text x="50%" y="50%" className={circlePercentage}>
            {progressBar}%
            {/* {console.log(`progressBar:${progressBar} couleur:${progressBar - startPercentage} transparent:${100 - progressBar + startPercentage} start:${startPercentage} targetPercentage:${targetPercentage}`)} */}
          </text>
          <text x="50%" y="50%" className={circleText}>
            {INNERTEXT}
          </text>
        </g>
    </React.Fragment>
  );
};




class Donut extends React.Component {
	constructor(props) {
		super(props);
    this.steps = [];
    let totalDuration = 0;
    for (let step of props.steps){
      totalDuration += step.duration;
    };
    let cumulDuration = 0;
    for (const step of props.steps){
      const stepPercentDuration = step.duration / totalDuration * 100;
      this.steps.push({
        start: cumulDuration,
        duration: stepPercentDuration,
        color: step.color,
      })
      cumulDuration += stepPercentDuration;
    };
	}


  generateOldSectors(untilIndex){
    const sectors= [];
    for(let i= 0; i<untilIndex; i++){
      const renderedOldStep = this.steps[i];
      sectors.push(<circle
            key = {"arc"+i}
            //className={path}
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke={renderedOldStep.color}
            strokeDasharray={`${renderedOldStep.duration-STROKEWHITESPACE} ${100 - renderedOldStep.duration-STROKEWHITESPACE}`}//"75 25"
            strokeDashoffset={INITIAL_OFFSET-renderedOldStep.start}
            opacity={0.4}
            strokeWidth={STROKEWIDTH}
          />)
    };
    return sectors;
  }
  


	render() {
    const renderedStep = this.steps[this.props.activeStepIndex];
		return (
      <figure className={donut}>
        <svg width="100%" height="100%" viewBox={circleConfig.viewBox}>
          <circle
            //className={ring}
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="whitesmoke"
            strokeWidth={STROKEWIDTH}
          />

          {this.generateOldSectors(this.props.activeStepIndex)}

          {this.props.animate? 
          <MovingArc
            strokeColor= {renderedStep.color}
            strokeWidth= {STROKEWIDTH+1}
            innerText= {'terminé'}
            startPercentage= {Math.round(renderedStep.start)}
            targetPercentage= {Math.round(renderedStep.start + renderedStep.duration)}
            speed= {0.15}
          />
          : 
          <g className={circleLabel}>
            <text x="50%" y="50%" className={circlePercentage}>
              {Math.round(renderedStep.start)}%
            </text>
            <text x="50%" y="50%" className={circleText}>
              {INNERTEXT}
            </text>
          </g>
          }

        </svg>
      </figure>
		)
	}
}

export default Donut
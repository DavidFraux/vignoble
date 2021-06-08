import React, { useState, useEffect }from "react";
import chroma from "chroma-js";
import CircleProgressBarBase from "../components/circle";
import {
  circleLabel,
  circlePercentage,
  circleText,
  path,
  ring,
  donutWrapper,
} from './donut.module.css'

const INITIAL_OFFSET = 25;
const STROKEWIDTH= 2;
const STROKEWHITESPACE = 0.3;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954',// circle radius of periph=100 for easy calculations
};


const MovingArc = ({
  //className,
  strokeColor,
  strokeWidth,
  innerText,
  legendText,
  targetPercentage,
  startPercentage,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  speed
}) => {

  const [progressBar, setProgressBar] = useState(startPercentage);
  const pace = (100-targetPercentage+startPercentage) / speed;
  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  const resetPercentage = () => {
    setProgressBar(startPercentage);
  };

  useEffect(() => {
    if (targetPercentage > startPercentage) updatePercentage();
  }, [targetPercentage]);

  useEffect(() => {
    if (progressBar < targetPercentage) updatePercentage();
  }, [progressBar]);

  useEffect(() => {
    if (progressBar > targetPercentage+1) resetPercentage();
  }, [progressBar]);

  return (
    <React.Fragment>
        <circle
          className={path}
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressBar - startPercentage} ${100 - progressBar + startPercentage}`}
          strokeDashoffset={INITIAL_OFFSET-startPercentage}
        />

        <g className={circleLabel}>
          <text x="50%" y="50%" className={circlePercentage}>
            {Math.round(progressBar)}%
          </text>
          <text x="50%" y="50%" className={circleText}>
            {innerText}
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
    const colors = chroma.scale(['deeppink','teal','yellow','red']).mode('lch').colors(props.steps.length);
    for (const [index, step] of props.steps.entries()){
      const stepPercentDuration = step.duration / totalDuration * 100;
      this.steps.push({
        start: cumulDuration,
        duration: stepPercentDuration,
        color: colors[index],
      })
      cumulDuration += stepPercentDuration;
      console.log(index, stepPercentDuration, cumulDuration);
    };
	}


  generateOldSectors(untilIndex){
    const sectors= [];
    for(let i= 0; i<untilIndex; i++){
      const renderedStep = this.steps[i];
      sectors.push(<circle
            key = {"arc"+i}
            className={path}
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke={renderedStep.color}
            strokeDasharray={`${renderedStep.duration-STROKEWHITESPACE} ${100 - renderedStep.duration-STROKEWHITESPACE}`}//"75 25"
            strokeDashoffset={INITIAL_OFFSET-renderedStep.start}
            opacity={0.4}
            strokeWidth={STROKEWIDTH}
          />)
    };
    return sectors;
  }
  


	render() {
    const renderedStep = this.steps[this.props.activeStepIndex];
    console.log(this.props.activeStepIndex, renderedStep);
		return (
      <figure className={donutWrapper}>
        <svg viewBox={circleConfig.viewBox}>
          <circle
            className={ring}
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="whitesmoke"
            strokeWidth={STROKEWIDTH}
          />


          {this.generateOldSectors(this.props.activeStepIndex)}

          
          <MovingArc
            strokeColor= {renderedStep.color}
            strokeWidth= {STROKEWIDTH+1}
            innerText= {'terminé'}
            legendText= ''
            startPercentage= {renderedStep.start}
            targetPercentage= {renderedStep.start + renderedStep.duration}
            trailStrokeWidth= {1}
            trailStrokeColor= {'#d2d3d4'}
            trailSpaced= {false}
            speed= {0.3}
          />

           {/*<circle
            className={path}
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke={renderedStep.color}
            //strokeDasharray={`0 100`}//"75 25"
            strokeDasharray={`${this.state.actualPercentage-renderedStep.start} ${100 - this.state.actualPercentage + renderedStep.start}`}//"75 25"
            strokeDashoffset={INITIAL_OFFSET-renderedStep.start}
            opacity={1}
            strokeWidth={STROKEWIDTH+1}
          />

          <g className={circleLabel}>
            <text x="50%" y="50%" className={circlePercentage}>
              {this.state.actualPercentage}%
            </text>
            <text x="50%" y="50%" className={circleText}>
              terminé
            </text>
          </g> */}
        </svg>
      </figure>
		)
	}
}

export default Donut

//ReactDOM.render(<SVGClock />, document.querySelector('#SVGClock'))
import React from "react";
import { infoBar, stepDescription } from './timeLine.module.css';




//==============



import Stepper from 'react-stepper-horizontal';




class TimeLine extends React.Component {

  handleClickPrevNext(i) {
    this.props.navigateSteps(i);//hook managed in parent 
  }

  render() {
    const currentStep = this.props.steps[this.props.activeStepIndex];
    return (
      <React.Fragment>
        <Stepper 
          completeOpacity='0.4' 
          activeColor='#22262e'
          completeColor = '#22262e'
          //border is used here to have a white gap between background and outline
          //outline is managed in the react package (react-stepper-horizontal / step.js)
          activeBorderColor = 'white'
          completeBorderColor = 'white'
          activeBorderStyle = 'solid'
          completeBorderStyle = 'solid'
          defaultBorderWidth = '1.5px'
          //colors are defined in steps
          steps={ this.props.steps } 
          activeStep={ this.props.activeStepIndex }
          circleFontSize='1rem' 
          titleFontSize='1rem' 
          size='1.8rem' />
        
        {/*
        <Stepper activeColor='#22262e' completeColor = '#22262e' steps={ this.props.steps } activeStep={ this.props.activeStepIndex } circleFontSize='1rem' titleFontSize='1rem' size='1.8rem'/>

        <div className={ infoBar }>
          <button className={ [timeLineStyles.btn, timeLineStyles.btnPrev].join(' ')  } onClick={ (e) => this.handleClickPrevNext(-1, e) }>Précédent</button> 
          <div className={ stepDescription }>{currentStep.short}</div>
          <button className={ [timeLineStyles.btn, timeLineStyles.btnNext].join(' ')  } onClick={ (e) => this.handleClickPrevNext(1, e) }>Suivant</button>
        </div>
        */}
        </React.Fragment>
    );
  }
};

export default TimeLine

//<Stepper activeColor='#22262e' completeColor = '#22262e' steps={ this.props.steps } activeStep={ this.props.activeStepIndex }  
//circleFontSize='1rem' titleFontSize='1rem' size='1.8rem'/>
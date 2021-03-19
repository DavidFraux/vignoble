import React from "react";
import timeLineStyles from './timeLine.module.css';




//==============



import Stepper from 'react-stepper-horizontal';




class TimeLine extends React.Component {

  handleClickPrevNext(i) {

    this.props.navigateSteps(i);//hook managed in parent 
  }

  render() {
    //const activeStepIndex = this.state;
    const currentStep = this.props.steps[this.props.activeStepIndex];
    return (
      <React.Fragment>
        <Stepper activeColor='#22262e' completeColor = '#22262e' steps={ this.props.steps } activeStep={ this.props.activeStepIndex } />
        <div className={ timeLineStyles.infoBar }>
          {/* <button className={ [timeLineStyles.btn, timeLineStyles.btnPrev].join(' ')  } onClick={ (e) => this.handleClickPrevNext(-1, e) }>Précédent</button> */}
          <div className={ timeLineStyles.stepDescription }>{currentStep.description}</div>
          {/* <button className={ [timeLineStyles.btn, timeLineStyles.btnNext].join(' ')  } onClick={ (e) => this.handleClickPrevNext(1, e) }>Suivant</button> */}
        </div>
        
        </React.Fragment>
    );
  }
};

export default TimeLine
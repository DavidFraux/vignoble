import React from "react";
import { Link } from "gatsby";
import timeLineStyles from './timeLine.module.css';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from 'react-icons/md';



//==============



import Stepper from 'react-stepper-horizontal';




class TimeLine extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickButton(i) {
    const targetIndex = this.props.activeStepIndex + i;
    if(targetIndex < 0 || targetIndex  >= this.props.steps.length) {
      return false;
    }
    this.props.onClickButton(i);//hook managed in parent 
  }

  render() {
    //const activeStepIndex = this.state;
    const currentStep = this.props.steps[this.props.activeStepIndex];
    return (
      <div>
        <Stepper activeColor='#22262e' completeColor = '#22262e' steps={ this.props.steps } activeStep={ this.props.activeStepIndex } />
        <div className={ timeLineStyles.infoBar }>
          <button className={ [timeLineStyles.btn, timeLineStyles.btnPrev].join(' ')  } onClick={ (e) => this.onClickButton(-1, e) }>Précédent</button>
          <div className={ timeLineStyles.stepDescription }>{currentStep.description}</div>
          <button className={ [timeLineStyles.btn, timeLineStyles.btnNext].join(' ')  } onClick={ (e) => this.onClickButton(1, e) }>Suivant</button>
        </div>
        
      </div>
    );
  }
};

export default TimeLine
import React from "react";
import { Link } from "gatsby";
import timeLineStyles from './timeLine.module.css';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from 'react-icons/md';



//==============



import Stepper from 'react-stepper-horizontal';




class TimeLine extends React.Component {
  constructor() {
    super();
    this.state = {
      steps: [{
        title: 'Fouler',
        description: 'fouler le raisin dans la maie, basse ou haute',
        onClick: (e) => {
          e.preventDefault();
          this.onClickStep(0);
        }
      }, {
        title: 'Préparation',
        description: 'installer les moutons',
        onClick: (e) => {
          e.preventDefault();
          this.onClickStep(1);
        }
      }, {
        title: 'Step Three',
        description: 'a completer par exemple',
        onClick: (e) => {
          e.preventDefault();
          this.onClickStep(2);
        }
      }, {
        title: 'Step Four',
        description: 'a completer par exemple',
        onClick: (e) => {
          e.preventDefault();
          this.onClickStep(3);
        }
      }],
      activeStepIndex: 0,
    };
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickStep(i) {
    //const { steps, activeStepIndex } = this.state;
    this.setState({
      activeStepIndex: i,
    });
  }

  onClickButton(i) {
    const { steps, activeStepIndex } = this.state;
    const targetIndex = activeStepIndex + i;
    if(targetIndex < 0 || targetIndex  >= steps.length) {
      return false;
    }
    this.setState({
      activeStepIndex: targetIndex ,
    });
  }

  render() {
    const { steps, activeStepIndex } = this.state;
    const currentStep = steps[activeStepIndex];

    return (
      <div>
        <Stepper steps={ steps } activeStep={ activeStepIndex } />
        <div class={ timeLineStyles.infoBar }>
          <button class={ [timeLineStyles.btn, timeLineStyles.btnPrev].join(' ')  } onClick={ (e) => this.onClickButton(-1, e) }>Précédent</button>
          <div class={ timeLineStyles.stepDescription }>{currentStep.description}</div>
          <button class={ [timeLineStyles.btn, timeLineStyles.btnNext].join(' ')  } onClick={ (e) => this.onClickButton(1, e) }>Suivant</button>
        </div>
        
      </div>
    );
  }
};

export default TimeLine
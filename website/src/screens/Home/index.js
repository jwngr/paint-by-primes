import React from 'react';
import Media from 'react-media';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import Stepper from '../../components/Stepper';
import Step1 from '../../components/Step1/container';
import Step2 from '../../components/Step2/container';
import Step3 from '../../components/Step3/container';
import Step4 from '../../components/Step4/container';
import Sidebar from '../../components/Sidebar/container';

import {Step, MainContent} from './index.styles';

// TODO: update page URL when completing steps

class HomeScreen extends React.Component {
  render() {
    const {currentStep} = this.props;

    let currentStepContent;
    if (currentStep === 1) {
      currentStepContent = <Step1 />;
    } else if (currentStep === 2) {
      currentStepContent = <Step2 />;
    } else if (currentStep === 3) {
      currentStepContent = <Step3 />;
    } else if (currentStep === 4) {
      currentStepContent = <Step4 />;
    }

    return (
      <React.Fragment>
        <Media query="(min-width: 768px)">{(matches) => matches && <Sidebar />}</Media>

        {/* <Stepper /> */}

        <MainContent>
          <TransitionGroup component={null}>
            <CSSTransition classNames="step" timeout={500} key={currentStep}>
              <Step>{currentStepContent}</Step>
            </CSSTransition>
          </TransitionGroup>
        </MainContent>
      </React.Fragment>
    );
  }
}

export default HomeScreen;

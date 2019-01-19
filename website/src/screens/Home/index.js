import React from 'react';
import Media from 'react-media';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import Step1 from '../../components/Step1/container';
import Step2 from '../../components/Step2/container';
import Step3 from '../../components/Step3/container';
import Step4 from '../../components/Step4/container';
import Step5 from '../../components/Step4/container';
import Sidebar from '../../components/Sidebar/container';
import StepIndicator from '../../components/StepIndicator/container';

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
      <>
        <Media query="(min-width: 768px)">
          {(matches) =>
            matches ? (
              <>
                <Sidebar />
                <MainContent>
                  <TransitionGroup component={null}>
                    <CSSTransition classNames="step" timeout={500} key={currentStep}>
                      <Step>{currentStepContent}</Step>
                    </CSSTransition>
                  </TransitionGroup>
                </MainContent>
              </>
            ) : (
              <MainContent>
                <StepIndicator step={1} />
                <Step1 />

                <StepIndicator step={2} />
                {currentStep >= 2 && <Step2 />}

                <StepIndicator step={3} />
                {currentStep >= 3 && <Step3 />}

                <StepIndicator step={4} />
                {currentStep >= 4 && <Step4 />}

                <StepIndicator step={5} />
                {currentStep >= 5 && <Step5 />}
              </MainContent>
            )
          }
        </Media>
      </>
    );
  }
}

export default HomeScreen;

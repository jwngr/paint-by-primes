import React from 'react';

import Logo from '../../components/Logo';
import Stepper from '../../components/Stepper';
import Step1 from '../../components/Step1/container';
import Step2 from '../../components/Step2/container';
import Step3 from '../../components/Step3/container';
import Step4 from '../../components/Step4/container';
import Step5 from '../../components/Step5/container';
import Sidebar from '../../components/Sidebar/container';

import {Wrapper, MainContent, Subtitle} from './index.styles';

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
    } else if (currentStep === 5) {
      currentStepContent = <Step5 />;
    }

    return (
      <Wrapper>
        <Sidebar />
        <MainContent>
          {currentStep === 1 && (
            <React.Fragment>
              <Logo fontSize="60px" />
              <Subtitle>Generate a prime number that looks like your image.</Subtitle>
            </React.Fragment>
          )}

          {/* <Stepper /> */}

          {currentStepContent}
        </MainContent>
      </Wrapper>
    );
  }
}

export default HomeScreen;

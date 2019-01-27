import React from 'react';
import Media from 'react-media';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import Step1 from '../../components/Step1/container';
import Step2 from '../../components/Step2/container';
import Step3 from '../../components/Step3/container';
import Step4 from '../../components/Step4/container';
import Step5 from '../../components/Step5/container';
import Sidebar from '../../components/Sidebar';
import StepDetails from '../../components/StepDetails/container';
import StepIndicator from '../../components/StepIndicator/container';

// TODO: add about section and link to GitHub.

import {
  SmallScreenLogoWithSubtitle,
  StepWrapper,
  StepSummaryWrapper,
  MainContent,
} from './index.styles';

const StepSummary = ({step, currentStep}) => {
  return (
    <StepSummaryWrapper>
      <StepIndicator step={step} />
      {(step === 1 || step !== currentStep) && <StepDetails step={step} />}
    </StepSummaryWrapper>
  );
};

class HomeScreen extends React.Component {
  render() {
    const {currentStep, latestCompletedStep} = this.props;

    return (
      <>
        <Media query="(min-width: 769px)">
          {(matches) => {
            if (matches) {
              let largeScreenStepContent;
              if (currentStep === 1) {
                largeScreenStepContent = <Step1 />;
              } else if (currentStep === 2) {
                largeScreenStepContent = <Step2 />;
              } else if (currentStep === 3) {
                largeScreenStepContent = <Step3 />;
              } else if (currentStep === 4) {
                largeScreenStepContent = <Step4 />;
              } else if (currentStep === 5) {
                largeScreenStepContent = <Step5 />;
              }

              return (
                <>
                  <Sidebar />
                  <MainContent>
                    <TransitionGroup component={null}>
                      <CSSTransition classNames="step" timeout={500} key={currentStep}>
                        <StepWrapper>{largeScreenStepContent}</StepWrapper>
                      </CSSTransition>
                    </TransitionGroup>
                  </MainContent>
                </>
              );
            } else {
              const smallScreenStepContent = [<SmallScreenLogoWithSubtitle key="home-logo" />];

              if (currentStep === 1) {
                smallScreenStepContent.push(<Step1 key="home-step-1" />);
              }

              if (latestCompletedStep >= 1) {
                smallScreenStepContent.push(
                  <StepSummary step={1} currentStep={currentStep} key="home-step-1-summary" />
                );

                smallScreenStepContent.push(
                  <StepSummary step={2} currentStep={currentStep} key="home-step-2-summary" />
                );
                if (currentStep === 2) {
                  smallScreenStepContent.push(<Step2 key="home-step-2" />);
                }

                smallScreenStepContent.push(
                  <StepSummary step={3} currentStep={currentStep} key="home-step-3-summary" />
                );
                if (currentStep === 3) {
                  smallScreenStepContent.push(<Step3 key="home-step-3" />);
                }

                smallScreenStepContent.push(
                  <StepSummary step={4} currentStep={currentStep} key="home-step-4-summary" />
                );
                if (currentStep === 4) {
                  smallScreenStepContent.push(<Step4 key="home-step-4" />);
                }

                smallScreenStepContent.push(
                  <StepSummary step={5} currentStep={currentStep} key="home-step-5-summary" />
                );
                if (currentStep === 5) {
                  smallScreenStepContent.push(<Step5 key="home-step-5" />);
                }
              }

              return <MainContent>{smallScreenStepContent}</MainContent>;
            }
          }}
        </Media>
      </>
    );
  }
}

export default HomeScreen;

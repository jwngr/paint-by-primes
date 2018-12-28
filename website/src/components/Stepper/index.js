import React from 'react';

import Step from './Step';

export default class Stepper extends React.Component {
  render() {
    const {currentStep, setCurrentStep} = this.props;

    return (
      <React.Fragment>
        <div className="stepper">
          <Step
            index={1}
            description="Choose image"
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
          />
          <Step
            index={2}
            description="Set pixel size"
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
          />
          <Step
            index={3}
            description="Assign digits"
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
          />
          <Step
            index={4}
            description="Personalize"
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
          />
          <Step
            index={5}
            description="View Result"
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
          />
        </div>
        {/* <style jsx>{`
          .stepper {
            margin: 28px auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
        `}</style> */}
      </React.Fragment>
    );
  }
}

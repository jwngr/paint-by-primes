import React from 'react';
import PropTypes from 'prop-types';

import {
  GooBlob,
  StepNumber,
  GooBlobWrapper,
  StepNumberItem,
  StepDescription,
  StepIndicatorWrapper,
} from './index.styles';

const STEP_DESCRIPTIONS = [
  'Choose source image',
  'Specify dimensions',
  'Define color palette',
  'Assign digits',
  'Generate prime image',
];

const StepIndicator = ({step, className, currentStep, setCurrentStep, latestCompletedStep}) => {
  const isCompleted = latestCompletedStep >= step;
  const isSelected = currentStep === step && (step !== 5 || !isCompleted);
  const isClickable = step <= latestCompletedStep + 1;

  return (
    <StepIndicatorWrapper
      className={className}
      onClick={() => setCurrentStep(step, latestCompletedStep)}
      isSelected={isSelected}
      isClickable={isClickable}
      isCompleted={isCompleted}
    >
      <StepNumber>
        <StepNumberItem>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              {!isCompleted && <circle r="10" cx="50%" cy="50%" />}
              {isCompleted && (
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
              )}
            </svg>
          </div>
          <div>
            <p>{step}</p>
          </div>
        </StepNumberItem>
        {isClickable && (
          <GooBlobWrapper>
            <GooBlob />
            <GooBlob />
            <GooBlob />
          </GooBlobWrapper>
        )}
      </StepNumber>
      <StepDescription>{STEP_DESCRIPTIONS[step - 1]}</StepDescription>
    </StepIndicatorWrapper>
  );
};

StepIndicator.propTypes = {
  step: PropTypes.number.isRequired,
  className: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  latestCompletedStep: PropTypes.number.isRequired,
};

export default StepIndicator;

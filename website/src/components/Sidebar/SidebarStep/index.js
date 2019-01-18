import React from 'react';

import Checkmark from '../../svgs/Checkmark';

import {
  GooBlob,
  StepIndex,
  StepHeader,
  StepWrapper,
  StepIndexItem,
  StepDescription,
  GooBlobContainer,
} from './index.styles';

export default ({
  step,
  description,
  currentStep,
  setCurrentStep,
  detailsContent,
  latestCompletedStep,
}) => {
  const isCompleted = latestCompletedStep >= step;
  const isSelected = currentStep === step && (step !== 5 || !isCompleted);
  const isClickable = step <= latestCompletedStep + 1;

  return (
    <StepWrapper
      onClick={() => setCurrentStep(step, latestCompletedStep)}
      isSelected={isSelected}
      isClickable={isClickable}
      isCompleted={isCompleted}
    >
      <StepHeader>
        <StepIndex>
          <StepIndexItem>
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
          </StepIndexItem>
          {isClickable && (
            <GooBlobContainer>
              <GooBlob />
              <GooBlob />
              <GooBlob />
            </GooBlobContainer>
          )}
        </StepIndex>
        <StepDescription>{description}</StepDescription>
      </StepHeader>
      {isCompleted && detailsContent}
    </StepWrapper>
  );
};

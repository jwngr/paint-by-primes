import React from 'react';

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
  const isSelected = currentStep === step;
  const isCompleted = latestCompletedStep >= step;

  return (
    <StepWrapper
      onClick={() => setCurrentStep(step, latestCompletedStep)}
      isSelected={isSelected}
      isCompleted={isCompleted}
    >
      <StepHeader>
        <StepIndex>
          <StepIndexItem>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                {isCompleted ? (
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                ) : (
                  <circle r="10" cx="50%" cy="50%" />
                )}
              </svg>
            </div>
            <div>
              <p>{step}</p>
            </div>
          </StepIndexItem>
          <GooBlobContainer>
            <GooBlob />
            <GooBlob />
            <GooBlob />
          </GooBlobContainer>
        </StepIndex>
        <StepDescription>{description}</StepDescription>
      </StepHeader>
      {isCompleted && detailsContent}
    </StepWrapper>
  );
};

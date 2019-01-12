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
              {isCompleted ? (
                <Checkmark />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <circle r="10" cx="50%" cy="50%" />
                </svg>
              )}
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

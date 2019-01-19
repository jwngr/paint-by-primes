import React from 'react';
import PropTypes from 'prop-types';

import {SidebarStepWrapper} from './index.styles';

import StepIndicator from '../../StepIndicator/container';

const SidebarStep = ({step, currentStep, detailsContent, latestCompletedStep}) => {
  const isCompleted = latestCompletedStep >= step;
  const isSelected = currentStep === step && (step !== 5 || !isCompleted);

  return (
    <SidebarStepWrapper isSelected={isSelected} isCompleted={isCompleted}>
      <StepIndicator step={step} />
      {detailsContent}
    </SidebarStepWrapper>
  );
};

SidebarStep.propTypes = {
  step: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  detailsContent: PropTypes.node.isRequired,
  latestCompletedStep: PropTypes.number.isRequired,
};

export default SidebarStep;

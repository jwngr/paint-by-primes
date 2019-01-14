import React from 'react';
import PropTypes from 'prop-types';

import {CardBodySection} from '../';
import {PlusButton, MinusButton} from '../../PlusMinusButton';

import {StepperValue, StepperControlsWrapper} from './index.styles';

const CardStepperSection = ({
  title,
  value,
  minValue,
  maxValue,
  onUpdate,
  transformValue,
  updateAmount = 1,
}) => {
  return (
    <CardBodySection title={title}>
      <StepperControlsWrapper>
        <MinusButton onClick={() => onUpdate(updateAmount * -1)} isHidden={value === minValue} />
        <StepperValue>{transformValue ? transformValue(value) : value}</StepperValue>
        <PlusButton onClick={() => onUpdate(updateAmount)} isHidden={value >= maxValue} />
      </StepperControlsWrapper>
    </CardBodySection>
  );
};

CardStepperSection.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  transformValue: PropTypes.func,
};

export default CardStepperSection;

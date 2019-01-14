import React from 'react';
import PropTypes from 'prop-types';

import {CardBodySection} from '../';
import {PlusButton, MinusButton} from '../../PlusMinusButton';

import {StepperValue, StepperControlsWrapper} from './index.styles';

const CardStepperSection = ({title, value, minValue, maxValue, onUpdate}) => {
  return (
    <CardBodySection title={title}>
      <StepperControlsWrapper>
        <MinusButton onClick={() => onUpdate(-1)} isHidden={value === minValue} />
        <StepperValue>{value}</StepperValue>
        <PlusButton onClick={() => onUpdate(1)} isHidden={value >= maxValue} />
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
};

export default CardStepperSection;

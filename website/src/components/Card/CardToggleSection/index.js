import React from 'react';
import PropTypes from 'prop-types';

import {CardBodySection} from '../';

import {ToggleLabel, ToggleInput, ToggleSlider, ToggleWrapper} from './index.styles';

const CardToggleSection = ({title, onToggle, isChecked}) => {
  return (
    <CardBodySection title={title}>
      <ToggleWrapper>
        <ToggleLabel>
          <ToggleInput type="checkbox" checked={isChecked} onChange={onToggle} />
          <ToggleSlider />
        </ToggleLabel>
      </ToggleWrapper>
    </CardBodySection>
  );
};

CardToggleSection.propTypes = {
  title: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default CardToggleSection;

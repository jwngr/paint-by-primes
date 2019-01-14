import React from 'react';
import PropTypes from 'prop-types';

import CardToggleSection from '../../Card/CardToggleSection';
import CardStepperSection from '../../Card/CardStepperSection';
import {CardBody, CardInstruction} from '../../Card';

import {PrimeImageControlsCardWrapper} from './index.styles';

class PrimeImageControlsCard extends React.PureComponent {
  render() {
    const {
      opacity,
      fontSize,
      hasBorders,
      isColorized,
      maxFontSize,
      toggleColors,
      toggleBorders,
      updateOpacity,
      updateFontSize,
    } = this.props;

    return (
      <PrimeImageControlsCardWrapper>
        <CardInstruction>
          Use the controls below to change how your prime image looks.
        </CardInstruction>
        <CardBody>
          <CardStepperSection
            title="Font Size"
            value={fontSize}
            minValue={1}
            maxValue={maxFontSize}
            onUpdate={updateFontSize}
          />
          <CardStepperSection
            title="Opacity"
            value={opacity}
            minValue={0}
            maxValue={1}
            onUpdate={updateOpacity}
            updateAmount={0.05}
            transformValue={(val) => `${Math.round(val * 100)}%`}
          />
          <CardToggleSection title="Colors" onToggle={toggleColors} isChecked={isColorized} />
          <CardToggleSection title="Borders" onToggle={toggleBorders} isChecked={hasBorders} />
        </CardBody>
      </PrimeImageControlsCardWrapper>
    );
  }
}

PrimeImageControlsCard.propTypes = {
  fontSize: PropTypes.number.isRequired,
  toggleColors: PropTypes.func.isRequired,
  toggleBorders: PropTypes.func.isRequired,
  updateOpacity: PropTypes.func.isRequired,
  updateFontSize: PropTypes.func.isRequired,
};

export default PrimeImageControlsCard;

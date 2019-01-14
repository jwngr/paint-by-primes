import React from 'react';
import PropTypes from 'prop-types';

import CardToggleSection from '../../Card/CardToggleSection';
import CardStepperSection from '../../Card/CardStepperSection';
import {CardBody, CardInstruction} from '../../Card';

import {PrimeImageControlsCardWrapper} from './index.styles';

class PrimeImageControlsCard extends React.PureComponent {
  render() {
    const {
      fontSize,
      hasBorders,
      isColorized,
      maxFontSize,
      toggleColors,
      toggleBorders,
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
  updateFontSize: PropTypes.func.isRequired,
};

export default PrimeImageControlsCard;

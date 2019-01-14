import React from 'react';
import PropTypes from 'prop-types';

import {CardBody, CardInstruction} from '../../Card';
import CardStepperSection from '../../Card/CardStepperSection';

import {PixelDimensionControlsWrapper, PixelDimensionControlsCardWrapper} from './index.styles';

class PixelDimensionControlsCard extends React.PureComponent {
  render() {
    const {
      pixelWidth,
      pixelHeight,
      maxPixelWidth,
      maxPixelHeight,
      updatePixelWidth,
      updatePixelHeight,
    } = this.props;

    return (
      <PixelDimensionControlsCardWrapper>
        <CardInstruction>
          Use the + and - buttons below to update your pixel dimensions.
        </CardInstruction>
        <CardBody>
          <PixelDimensionControlsWrapper>
            <CardStepperSection
              title="Width"
              value={pixelWidth}
              onUpdate={updatePixelWidth}
              minValue={1}
              maxValue={maxPixelWidth}
            />
            <CardStepperSection
              title="Height"
              value={pixelHeight}
              onUpdate={updatePixelHeight}
              minValue={1}
              maxValue={maxPixelHeight}
            />
          </PixelDimensionControlsWrapper>
        </CardBody>
      </PixelDimensionControlsCardWrapper>
    );
  }
}

PixelDimensionControlsCard.propTypes = {
  pixelWidth: PropTypes.number.isRequired,
  pixelHeight: PropTypes.number.isRequired,
  maxPixelWidth: PropTypes.number.isRequired,
  maxPixelHeight: PropTypes.number.isRequired,
  updatePixelWidth: PropTypes.func.isRequired,
  updatePixelHeight: PropTypes.func.isRequired,
};

export default PixelDimensionControlsCard;

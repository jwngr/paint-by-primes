import React from 'react';
import PropTypes from 'prop-types';

import CardFooter from '../../Card/CardFooter';
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
          Specify your pixel dimensions using the + and - buttons below.
        </CardInstruction>
        <CardBody>
          <PixelDimensionControlsWrapper>
            <CardStepperSection
              title="Pixel Width"
              value={pixelWidth}
              onUpdate={updatePixelWidth}
              minValue={1}
              maxValue={maxPixelWidth}
            />
            <CardStepperSection
              title="Pixel Height"
              value={pixelHeight}
              onUpdate={updatePixelHeight}
              minValue={1}
              maxValue={maxPixelHeight}
            />
          </PixelDimensionControlsWrapper>
        </CardBody>
        <CardFooter
          type="info"
          text="Smaller pixels yield more digits and longer processing times."
        />
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

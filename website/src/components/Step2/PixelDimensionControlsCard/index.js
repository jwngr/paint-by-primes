import React from 'react';
import PropTypes from 'prop-types';

import {SmallCapsHeader} from '../../index.styles';
import {PlusButton, MinusButton} from '../../PlusMinusButton';
import {CardBody, CardInstruction} from '../../Card';

import {
  PixelDimensionValue,
  PixelDimensionControlWrapper,
  PixelDimensionControlsCardWrapper,
} from './index.styles';

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
          <PixelDimensionControlWrapper>
            <SmallCapsHeader>WIDTH</SmallCapsHeader>
            <div>
              <MinusButton onClick={() => updatePixelWidth(-1)} isHidden={pixelWidth === 1} />
              <PixelDimensionValue>{pixelWidth}</PixelDimensionValue>
              <PlusButton
                onClick={() => updatePixelWidth(1)}
                isHidden={pixelWidth >= maxPixelWidth}
              />
            </div>
          </PixelDimensionControlWrapper>

          <PixelDimensionControlWrapper>
            <SmallCapsHeader>HEIGHT</SmallCapsHeader>
            <div>
              <MinusButton onClick={() => updatePixelHeight(-1)} isHidden={pixelHeight === 1} />
              <PixelDimensionValue>{pixelHeight}</PixelDimensionValue>
              <PlusButton
                onClick={() => updatePixelHeight(1)}
                isHidden={pixelHeight >= maxPixelHeight}
              />
            </div>
          </PixelDimensionControlWrapper>
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

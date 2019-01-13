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

const PixelDimensionControlsCard = ({
  pixelWidth,
  pixelHeight,
  maxPixelWidth,
  maxPixelHeight,
  updatePixelWidth,
  updatePixelHeight,
}) => {
  return (
    <PixelDimensionControlsCardWrapper>
      <CardInstruction>
        Use the + and - buttons below to update your pixel dimensions.
      </CardInstruction>
      <CardBody>
        <PixelDimensionControlWrapper>
          <SmallCapsHeader>WIDTH</SmallCapsHeader>
          <div>
            <MinusButton onClick={() => updatePixelWidth(-1)} />
            <PixelDimensionValue>{pixelWidth}</PixelDimensionValue>
            {pixelWidth < maxPixelWidth && <PlusButton onClick={() => updatePixelWidth(1)} />}
          </div>
        </PixelDimensionControlWrapper>

        <PixelDimensionControlWrapper>
          <SmallCapsHeader>HEIGHT</SmallCapsHeader>
          <div>
            <MinusButton onClick={() => updatePixelHeight(-1)} />
            <PixelDimensionValue>{pixelHeight}</PixelDimensionValue>
            {pixelHeight < maxPixelHeight && <PlusButton onClick={() => updatePixelHeight(1)} />}
          </div>
        </PixelDimensionControlWrapper>
      </CardBody>
    </PixelDimensionControlsCardWrapper>
  );
};

PixelDimensionControlsCard.propTypes = {
  pixelWidth: PropTypes.number.isRequired,
  pixelHeight: PropTypes.number.isRequired,
  maxPixelWidth: PropTypes.number.isRequired,
  maxPixelHeight: PropTypes.number.isRequired,
  updatePixelWidth: PropTypes.func.isRequired,
  updatePixelHeight: PropTypes.func.isRequired,
};

export default PixelDimensionControlsCard;

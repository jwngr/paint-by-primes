import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {CardBody, CardInstruction} from '../../Card';
import CardValueSection from '../../Card/CardValueSection';

import {Swatch, SwatchesWrapper, StatsCardWrapper} from './index.styles';

import {getNumberWithCommas} from '../../../lib/utils';

class StatsCard extends React.PureComponent {
  render() {
    const {sourceImage, digitMappings, pixelatedImage, pixelDimensions} = this.props;

    let dimensions = '-';
    let digitsCount = '-';
    let colorSwatches = '-';
    if (sourceImage && pixelDimensions && pixelatedImage && digitMappings) {
      const widthInPixels = Math.ceil(sourceImage.width / pixelDimensions.width);
      const heightInPixels = Math.ceil(sourceImage.height / pixelDimensions.height);

      dimensions = `${getNumberWithCommas(widthInPixels)} × ${getNumberWithCommas(heightInPixels)}`;
      digitsCount = getNumberWithCommas(widthInPixels * heightInPixels);

      colorSwatches = (
        <SwatchesWrapper>
          {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
            <Swatch hexValue={hexValue} key={`step4-swatch-${hexValue.replace('#', '')}`}>
              {digitMappings.hexValuesToDigits[hexValue]}
            </Swatch>
          ))}
        </SwatchesWrapper>
      );
    }

    return (
      <StatsCardWrapper>
        <CardInstruction>Your prime image is being generated!</CardInstruction>
        <CardBody>
          <CardValueSection title="Dimensions" value={dimensions} />
          <CardValueSection title="Pixel / Digit Count" value={digitsCount} />
          <CardValueSection title="Colors" value={colorSwatches} />
        </CardBody>
      </StatsCardWrapper>
    );
  }
}

StatsCard.propTypes = {
  sourceImage: PropTypes.object,
  digitMappings: PropTypes.object,
  pixelatedImage: PropTypes.object,
  pixelDimensions: PropTypes.object,
};

export default StatsCard;

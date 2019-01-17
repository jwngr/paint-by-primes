import React from 'react';
import PropTypes from 'prop-types';

import CardFooter from '../../Card/CardFooter';
import {CardBody, CardInstruction} from '../../Card';
import CardValueSection from '../../Card/CardValueSection';

import {getNumberWithCommas, getDigitsCountColor} from '../../../lib/utils';

import {PixelatedImageSizeResultsCardWrapper} from './index.styles';

import {
  PRIME_IMAGE_MAX_DIGIT_COUNT,
  PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT,
} from '../../../resources/constants';

class PixelatedImageSizeResultsCard extends React.PureComponent {
  render() {
    const {widthInPixels, heightInPixels} = this.props;

    const digitsCount = widthInPixels * heightInPixels;
    const digitsCountColor = getDigitsCountColor(digitsCount);

    let footerType;
    let footerText;
    if (digitsCount > PRIME_IMAGE_MAX_DIGIT_COUNT) {
      footerType = 'error';
      footerText = `Too many pixels! Increase your pixel width or height.`;
    } else if (digitsCount > PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT) {
      footerType = 'info';
      footerText = 'It will take at least five minutes to generate your prime image.';
    } else {
      footerType = 'success';
      footerText = 'Looks good! It will not take long to generate your prime image.';
    }

    return (
      <PixelatedImageSizeResultsCardWrapper>
        <CardInstruction>These will be the dimensions of your prime image.</CardInstruction>
        <CardBody>
          <CardValueSection
            title="Dimensions"
            value={`${getNumberWithCommas(widthInPixels)} × ${getNumberWithCommas(heightInPixels)}`}
            color={digitsCountColor}
          />
          <CardValueSection
            title="Pixel / Digit Count"
            value={getNumberWithCommas(digitsCount)}
            color={digitsCountColor}
          />
        </CardBody>
        <CardFooter type={footerType} text={footerText} color={digitsCountColor} />
      </PixelatedImageSizeResultsCardWrapper>
    );
  }
}

PixelatedImageSizeResultsCard.propTypes = {
  widthInPixels: PropTypes.number.isRequired,
  heightInPixels: PropTypes.number.isRequired,
};

export default PixelatedImageSizeResultsCard;

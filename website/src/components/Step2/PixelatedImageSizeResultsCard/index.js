import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../svgs/Info';
import Warning from '../../svgs/Warning';
import ThinCheckmark from '../../svgs/ThinCheckmark';
import {CardBody, CardInstruction} from '../../Card';
import CardValueSection from '../../Card/CardValueSection';

import {getNumberWithCommas, getDigitsCountColor} from '../../../lib/utils';

import {
  TimeEstimateMessage,
  PixelatedImageSizeResultsWrapper,
  PixelatedImageSizeResultsCardWrapper,
} from './index.styles';

import {
  PRIME_IMAGE_MAX_DIGIT_COUNT,
  PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT,
} from '../../../resources/constants';

const getTimeEstimateContent = (digitsCount, digitsCountColor) => {
  let message;
  let messageIcon;
  if (digitsCount > PRIME_IMAGE_MAX_DIGIT_COUNT) {
    messageIcon = <Warning />;
    message = `Too many pixels! Increase your pixel width or height.`;
  } else if (digitsCount > PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT) {
    messageIcon = <Info />;
    message = 'It will take at least five minutes to generate your prime image.';
  } else {
    messageIcon = <ThinCheckmark />;
    message = 'Looks good! It will not take long to generate your prime image.';
  }

  return (
    <TimeEstimateMessage digitsCountColor={digitsCountColor}>
      {messageIcon}
      <p>{message}</p>
    </TimeEstimateMessage>
  );
};

class PixelatedImageSizeResultsCard extends React.PureComponent {
  render() {
    const {widthInPixels, heightInPixels} = this.props;

    const digitsCount = widthInPixels * heightInPixels;
    const digitsCountColor = getDigitsCountColor(digitsCount);

    return (
      <PixelatedImageSizeResultsCardWrapper>
        <CardInstruction>These will be the dimensions of your prime image.</CardInstruction>
        <CardBody>
          <PixelatedImageSizeResultsWrapper>
            <CardValueSection
              title="Dimensions"
              value={`${getNumberWithCommas(widthInPixels)} × ${getNumberWithCommas(
                heightInPixels
              )}`}
              color={digitsCountColor}
            />
            <CardValueSection
              title="Pixel / Digit Count"
              value={digitsCount}
              color={digitsCountColor}
            />
          </PixelatedImageSizeResultsWrapper>

          {getTimeEstimateContent(digitsCount, digitsCountColor)}
        </CardBody>
      </PixelatedImageSizeResultsCardWrapper>
    );
  }
}

PixelatedImageSizeResultsCard.propTypes = {
  widthInPixels: PropTypes.number.isRequired,
  heightInPixels: PropTypes.number.isRequired,
};

export default PixelatedImageSizeResultsCard;

import React from 'react';
import PropTypes from 'prop-types';

import Warning from '../../svgs/Warning';
import Checkmark from '../../svgs/Checkmark';
import {SmallCapsHeader} from '../../index.styles';
import {CardBody, CardInstruction} from '../../Card';

import {getNumberWithCommas} from '../../../lib/utils';

import {
  TimeEstimateMessage,
  PixelatedImageSizeResultWrapper,
  PixelatedImageSizeResultsWrapper,
  PixelatedImageSizeResultsCardWrapper,
} from './index.styles';

import {
  PRIME_IMAGE_MAX_DIGIT_COUNT,
  PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT,
} from '../../../resources/constants';

const getTimeEstimateContent = (digitsCount) => {
  let message;
  let messageIcon;
  if (digitsCount > PRIME_IMAGE_MAX_DIGIT_COUNT) {
    messageIcon = <Warning />;
    message = `Too many pixels! Increase your pixel width or height.`;
  } else if (digitsCount > PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT) {
    messageIcon = <Warning />;
    message = 'It will take at least five minutes to generate your prime image.';
  } else {
    messageIcon = <Checkmark />;
    message = 'Looks good! It will not take long to generate your prime image.';
  }

  return (
    <TimeEstimateMessage digitsCount={digitsCount}>
      {messageIcon}
      <p>{message}</p>
    </TimeEstimateMessage>
  );
};

class PixelatedImageSizeResultsCard extends React.PureComponent {
  render() {
    const {widthInPixels, heightInPixels} = this.props;

    const digitsCount = widthInPixels * heightInPixels;

    return (
      <PixelatedImageSizeResultsCardWrapper>
        <CardInstruction>These will be the dimensions of your prime image.</CardInstruction>
        <CardBody>
          <PixelatedImageSizeResultsWrapper>
            <PixelatedImageSizeResultWrapper digitsCount={digitsCount}>
              <SmallCapsHeader>DIMENSIONS</SmallCapsHeader>
              <p>
                {getNumberWithCommas(widthInPixels)} &times; {getNumberWithCommas(heightInPixels)}
              </p>
            </PixelatedImageSizeResultWrapper>

            <PixelatedImageSizeResultWrapper digitsCount={digitsCount}>
              <SmallCapsHeader>PIXEL / DIGIT COUNT</SmallCapsHeader>
              <p>{getNumberWithCommas(digitsCount)}</p>
            </PixelatedImageSizeResultWrapper>
          </PixelatedImageSizeResultsWrapper>

          {getTimeEstimateContent(digitsCount)}
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

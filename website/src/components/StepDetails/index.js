import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Swatch,
  SwatchesWrapper,
  Step1DetailsWrapper,
  Step2DetailsWrapper,
  Step3DetailsWrapper,
  Step4DetailsWrapper,
  Step5DetailsWrapper,
} from './index.styles';

import {getNumberWithCommas} from '../../lib/utils';

const StepIndicator = ({step, sourceImage, pixelDimensions, pixelatedImage, digitMappings}) => {
  let stepDetailsContent;
  if (step === 1) {
    stepDetailsContent = sourceImage && (
      <Step1DetailsWrapper width={sourceImage.width} height={sourceImage.height}>
        <img src={sourceImage.fileUrl} alt={'Original source thumbnail'} />
      </Step1DetailsWrapper>
    );
  } else if (step === 2) {
    stepDetailsContent = pixelDimensions && (
      <Step2DetailsWrapper>
        <p>
          {getNumberWithCommas(Math.ceil(sourceImage.width / pixelDimensions.width))} &times;{' '}
          {getNumberWithCommas(Math.ceil(sourceImage.height / pixelDimensions.height))}
        </p>
        <p>
          {getNumberWithCommas(
            Math.ceil(sourceImage.width / pixelDimensions.width) *
              Math.ceil(sourceImage.height / pixelDimensions.height)
          )}{' '}
          digits
        </p>
      </Step2DetailsWrapper>
    );
  } else if (step === 3) {
    stepDetailsContent = pixelatedImage && (
      <Step3DetailsWrapper>
        <SwatchesWrapper>
          {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
            <Swatch hexValue={hexValue} key={`step3-swatch-${hexValue.replace('#', '')}`} />
          ))}
        </SwatchesWrapper>
      </Step3DetailsWrapper>
    );
  } else if (step === 4) {
    stepDetailsContent = digitMappings && (
      <Step4DetailsWrapper>
        <SwatchesWrapper>
          {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
            <Swatch hexValue={hexValue} key={`step4-swatch-${hexValue.replace('#', '')}`}>
              {digitMappings.hexValuesToDigits[hexValue]}
            </Swatch>
          ))}
        </SwatchesWrapper>
      </Step4DetailsWrapper>
    );
  } else if (step === 5) {
    stepDetailsContent = <Step5DetailsWrapper />;
  }

  return stepDetailsContent;
};

StepIndicator.propTypes = {
  step: PropTypes.number.isRequired,
  sourceImage: PropTypes.object,
  digitMappings: PropTypes.object,
  pixelatedImage: PropTypes.object,
  pixelDimensions: PropTypes.object,
};

export default StepIndicator;

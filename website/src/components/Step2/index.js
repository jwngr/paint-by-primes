import _ from 'lodash';
import React from 'react';

import Button from '../Button';
import StepInstructions from '../StepInstructions';

import {
  ImageWrapper,
  VerticalLine,
  HorizontalLine,
  ContentWrapper,
  PixelDimension,
  ResultsWrapper,
  PlusMinusButton,
  ControlsWrapper,
  PixelDimensionValue,
  TimeEstimateMessage,
  PixelDimensionsWrapper,
} from './index.styles';

import {getNumberWithCommas} from '../../lib/utils';

export const MAX_DIGITS = 4000;
export const MAX_DIGITS_WITHOUT_WARNING = 2500;

const getTimeEstimateMessage = (digitsCount) => {
  let message;
  let boldText;
  if (digitsCount > MAX_DIGITS) {
    boldText = 'Hold on...';
    message =
      'it will take too long to generate your prime image. Reduce its size by increasing your pixel dimensions.';
  } else if (digitsCount > MAX_DIGITS_WITHOUT_WARNING) {
    boldText = 'Just so you know...';
    message = 'it will take at least five minutes to generate a prime image with this many digits.';
  } else {
    boldText = 'Nice!';
    message = 'Your pixel dimensions will work great.';
  }

  return (
    <TimeEstimateMessage digitsCount={digitsCount}>
      <b>{boldText}</b> {message}
    </TimeEstimateMessage>
  );
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    const {sourceImage, pixelDimensions} = props;

    this.width = sourceImage.width;
    this.height = sourceImage.height;

    this.scaleFactor = 1;

    let i = 1;
    while (this.width < 400) {
      this.scaleFactor = (this.scaleFactor / i) * (i + 1);
      this.width = sourceImage.width * this.scaleFactor;
      this.height = sourceImage.height * this.scaleFactor;
      i++;
    }

    i = 1;
    while (this.width > 1000) {
      this.scaleFactor = (this.scaleFactor * i) / (i + 1);
      this.width = sourceImage.width * this.scaleFactor;
      this.height = sourceImage.height * this.scaleFactor;
      i++;
    }

    console.log(this.scaleFactor, this.width, this.height);

    let initialPixelWidth;
    let initialPixelHeight;
    if (pixelDimensions) {
      initialPixelWidth = pixelDimensions.width;
      initialPixelHeight = pixelDimensions.height;
    } else {
      initialPixelWidth = Math.floor(sourceImage.width / 50);
      initialPixelHeight = Math.floor(sourceImage.height / 50);
    }

    this.state = {
      errorMessage: null,
      pixelWidth: initialPixelWidth,
      pixelHeight: initialPixelHeight,
      maxPixelWidth: Math.floor(sourceImage.width / 4),
      maxPixelHeight: Math.floor(sourceImage.height / 4),
      targetDimensions: this.getTargetDimensions(initialPixelWidth, initialPixelHeight),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
  }

  getTargetDimensions = (pixelWidth, pixelHeight) => {
    const {sourceImage} = this.props;

    return {
      width: Math.ceil(sourceImage.width / pixelWidth),
      height: Math.ceil(sourceImage.height / pixelHeight),
    };
  };

  updatePixelWidth = (amount) => {
    const {pixelWidth, pixelHeight, maxPixelWidth} = this.state;

    // Update the pixel width, ensuring it is a positive integer no greater than the max pixel
    // width.
    let updatedPixelWidth = pixelWidth + amount;
    updatedPixelWidth = Math.max(updatedPixelWidth, 1);
    updatedPixelWidth = Math.min(updatedPixelWidth, maxPixelWidth);

    this.setState({
      pixelWidth: updatedPixelWidth,
      targetDimensions: this.getTargetDimensions(updatedPixelWidth, pixelHeight),
    });
  };

  updatePixelHeight = (amount) => {
    const {pixelWidth, pixelHeight, maxPixelHeight} = this.state;

    // Update the pixel height, ensuring it is a positive integer no greater than the max pixel
    // height.
    let updatedPixelHeight = pixelHeight + amount;
    updatedPixelHeight = Math.max(updatedPixelHeight, 1);
    updatedPixelHeight = Math.min(updatedPixelHeight, maxPixelHeight);

    this.setState({
      pixelHeight: updatedPixelHeight,
      targetDimensions: this.getTargetDimensions(pixelWidth, updatedPixelHeight),
    });
  };

  render() {
    const {sourceImage, setPixelDimensions} = this.props;
    const {pixelWidth, pixelHeight, maxPixelWidth, maxPixelHeight, targetDimensions} = this.state;

    const digitsCount = targetDimensions.width * targetDimensions.height;

    const scaledPixelWidth = pixelWidth * this.scaleFactor;
    const scaledPixelHeight = pixelHeight * this.scaleFactor;

    let pixelLines = [];
    for (let i = 1; i < this.width / scaledPixelWidth; i++) {
      pixelLines.push(
        <HorizontalLine
          left={i * scaledPixelWidth}
          height={this.height}
          key={`horizontal-line-${i}`}
        >
          &nbsp;
        </HorizontalLine>
      );
    }

    for (let i = 1; i < this.height / scaledPixelHeight; i++) {
      pixelLines.push(
        <VerticalLine top={i * scaledPixelHeight} width={this.width} key={`vertical-line-${i}`}>
          &nbsp;
        </VerticalLine>
      );
    }

    return (
      <React.Fragment>
        <StepInstructions>
          <p>Specify the dimensions of your prime image.</p>
          <p>Smaller pixels result in more digits and a longer search for your prime.</p>
        </StepInstructions>

        <ContentWrapper>
          <ControlsWrapper>
            <PixelDimensionsWrapper>
              <PixelDimension>
                <p>Pixel Width</p>
                <div>
                  <PlusMinusButton
                    isHidden={pixelWidth === 1}
                    onClick={() => this.updatePixelWidth(-1)}
                  >
                    -
                  </PlusMinusButton>
                  <PixelDimensionValue>{pixelWidth}</PixelDimensionValue>
                  <PlusMinusButton
                    isHidden={pixelWidth === maxPixelWidth}
                    onClick={() => this.updatePixelWidth(1)}
                  >
                    +
                  </PlusMinusButton>
                </div>
              </PixelDimension>

              <PixelDimension>
                <p>Pixel Height</p>
                <div>
                  <PlusMinusButton
                    isHidden={pixelHeight === 1}
                    onClick={() => this.updatePixelHeight(-1)}
                  >
                    -
                  </PlusMinusButton>
                  <PixelDimensionValue>{pixelHeight}</PixelDimensionValue>
                  <PlusMinusButton
                    isHidden={pixelHeight === maxPixelHeight}
                    onClick={() => this.updatePixelHeight(1)}
                  >
                    +
                  </PlusMinusButton>
                </div>
              </PixelDimension>
            </PixelDimensionsWrapper>

            <ResultsWrapper digitsCount={digitsCount}>
              <p>Dimensions</p>
              <div>
                <p>
                  {getNumberWithCommas(targetDimensions.width)} &times;{' '}
                  {getNumberWithCommas(targetDimensions.height)}
                </p>
                <p>{getNumberWithCommas(digitsCount)} pixels</p>
              </div>
            </ResultsWrapper>

            {getTimeEstimateMessage(digitsCount)}

            <Button
              onClick={() =>
                setPixelDimensions({
                  width: pixelWidth,
                  height: pixelHeight,
                  scaleFactor: this.scaleFactor,
                })
              }
              disabled={digitsCount > MAX_DIGITS}
            >
              Pixelate
            </Button>
          </ControlsWrapper>

          <div>
            <ImageWrapper width={this.width} height={this.height}>
              <img src={sourceImage.fileUrl} alt="Source" />
              {pixelLines}
            </ImageWrapper>
          </div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Step2;

import _ from 'lodash';
import React from 'react';

import Button from '../Button';
import PlusMinusButton from '../PlusMinusButton';
import StepInstructions from '../StepInstructions';
import {CardBody, CardInstruction} from '../Card';

import Warning from '../svgs/Warning';
import Checkmark from '../svgs/Checkmark';

import {SmallCapsHeader} from '../index.styles';

import {
  ImageWrapper,
  VerticalLine,
  HorizontalLine,
  ContentWrapper,
  ControlsWrapper,
  PixelDimensionValue,
  TimeEstimateMessage,
  PixelDimensionsCard,
  PixelDimensionControl,
  PixelatedImageSizeCard,
  ControlsAndButtonWrapper,
  PixelatedImageSizeResult,
  PixelatedImageSizeResults,
} from './index.styles';

import {getNumberWithCommas} from '../../lib/utils';

export const MAX_DIGITS = 4000;
export const MAX_DIGITS_WITHOUT_WARNING = 2500;

const getTimeEstimateMessage = (digitsCount) => {
  let message;
  let messageIcon;
  if (digitsCount > MAX_DIGITS) {
    messageIcon = <Warning />;
    message =
      'It will take too long to generate your prime image. Reduce its size by increasing your pixel dimensions.';
  } else if (digitsCount > MAX_DIGITS_WITHOUT_WARNING) {
    messageIcon = <Warning />;
    message = 'It will take at least five minutes to generate a prime image with this many digits.';
  } else {
    messageIcon = <Checkmark />;
    message = 'Your pixel dimensions will work great.';
  }

  return (
    <TimeEstimateMessage digitsCount={digitsCount}>
      {messageIcon}
      <p>{message}</p>
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
    while (this.width > 800) {
      this.scaleFactor = (this.scaleFactor * i) / (i + 1);
      this.width = sourceImage.width * this.scaleFactor;
      this.height = sourceImage.height * this.scaleFactor;
      i++;
    }

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
          <p>Specify your pixel dimensions.</p>
          <p>Smaller pixels yield more digits and longer processing times.</p>
        </StepInstructions>

        <ContentWrapper>
          <ControlsAndButtonWrapper>
            <ControlsWrapper>
              <PixelDimensionsCard>
                <CardInstruction>
                  Use the + and - buttons below to update your pixel dimensions.
                </CardInstruction>
                <CardBody>
                  <PixelDimensionControl>
                    <SmallCapsHeader>WIDTH</SmallCapsHeader>
                    <div>
                      <PlusMinusButton
                        plusOrMinus="minus"
                        onClick={() => this.updatePixelWidth(-1)}
                      />
                      <PixelDimensionValue>{pixelWidth}</PixelDimensionValue>
                      <PlusMinusButton
                        plusOrMinus="plus"
                        onClick={() => this.updatePixelWidth(1)}
                      />
                    </div>
                  </PixelDimensionControl>

                  <PixelDimensionControl>
                    <SmallCapsHeader>HEIGHT</SmallCapsHeader>
                    <div>
                      <PlusMinusButton
                        plusOrMinus="minus"
                        onClick={() => this.updatePixelHeight(-1)}
                      />
                      <PixelDimensionValue>{pixelHeight}</PixelDimensionValue>
                      <PlusMinusButton
                        plusOrMinus="plus"
                        onClick={() => this.updatePixelHeight(1)}
                      />
                    </div>
                  </PixelDimensionControl>
                </CardBody>
              </PixelDimensionsCard>

              <PixelatedImageSizeCard>
                <CardInstruction>These will be the dimensions of your prime image.</CardInstruction>
                <CardBody>
                  <PixelatedImageSizeResults>
                    <PixelatedImageSizeResult digitsCount={digitsCount}>
                      <SmallCapsHeader>DIMENSIONS</SmallCapsHeader>
                      <p>
                        {getNumberWithCommas(targetDimensions.width)} &times;{' '}
                        {getNumberWithCommas(targetDimensions.height)}
                      </p>
                    </PixelatedImageSizeResult>

                    <PixelatedImageSizeResult digitsCount={digitsCount}>
                      <SmallCapsHeader>PIXEL / DIGIT COUNT</SmallCapsHeader>
                      <p>{getNumberWithCommas(digitsCount)}</p>
                    </PixelatedImageSizeResult>
                  </PixelatedImageSizeResults>

                  {getTimeEstimateMessage(digitsCount)}
                </CardBody>
              </PixelatedImageSizeCard>
            </ControlsWrapper>
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
          </ControlsAndButtonWrapper>

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

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import GriddedImage from './GriddedImage';
import PixelDimensionControlsCard from './PixelDimensionControlsCard';
import PixelatedImageSizeResultsCard from './PixelatedImageSizeResultsCard';

import {PRIME_IMAGE_MAX_DIGIT_COUNT} from '../../resources/constants';

import {CardsWrapper, ContentWrapper, CardsAndButtonWrapper} from './index.styles';

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

    return (
      <ContentWrapper>
        <CardsAndButtonWrapper>
          <CardsWrapper>
            <PixelDimensionControlsCard
              pixelWidth={pixelWidth}
              pixelHeight={pixelHeight}
              maxPixelWidth={maxPixelWidth}
              maxPixelHeight={maxPixelHeight}
              updatePixelWidth={this.updatePixelWidth}
              updatePixelHeight={this.updatePixelHeight}
            />

            <PixelatedImageSizeResultsCard
              widthInPixels={targetDimensions.width}
              heightInPixels={targetDimensions.height}
            />
          </CardsWrapper>
          <Button
            onClick={() =>
              setPixelDimensions({
                width: pixelWidth,
                height: pixelHeight,
                scaleFactor: this.scaleFactor,
              })
            }
            isDisabled={digitsCount > PRIME_IMAGE_MAX_DIGIT_COUNT}
          >
            Pixelate
          </Button>
        </CardsAndButtonWrapper>

        <GriddedImage
          src={sourceImage.fileUrl}
          imageWidth={this.width}
          imageHeight={this.height}
          pixelWidth={pixelWidth}
          pixelHeight={pixelHeight}
          scaleFactor={this.scaleFactor}
        />
      </ContentWrapper>
    );
  }
}

Step2.propTypes = {
  sourceImage: PropTypes.object.isRequired,
  pixelDimensions: PropTypes.object,
  setPixelDimensions: PropTypes.func.isRequired,
};

export default Step2;

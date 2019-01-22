import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import SwatchesCard from './SwatchesCard';
import PixelatedImage from './PixelatedImage';
import ColorPickerCard from './ColorPickerCard';

import {pixelate} from '../../lib/pixelator.js';

import {
  Message,
  ErrorMessage,
  CardsWrapper,
  ContentWrapper,
  SetColorsButton,
  CardsAndButtonWrapper,
} from './index.styles';

class Step3 extends React.Component {
  state = {
    hexValues: null,
    errorMessage: null,
    selectedSwatchIndex: 0,
    pixelHexValueIndexes: null,
    highlightedPixelsHexValueIndex: null,
  };

  componentDidMount() {
    const {sourceImage, pixelDimensions, pixelatedImage} = this.props;

    if (pixelatedImage) {
      this.setState({
        ...pixelatedImage,
      });
    } else {
      return pixelate(sourceImage.fileUrl, pixelDimensions)
        .then(({hexValues, pixelHexValueIndexes}) => {
          this.setState({
            hexValues,
            errorMessage: null,
            pixelHexValueIndexes,
          });
        })
        .catch((error) => {
          this.setState({errorMessage: error.message});
        });
    }
  }

  setSelectedSwatchIndex = (updatedSelectedSwatchIndex) => {
    this.setState({
      selectedSwatchIndex: updatedSelectedSwatchIndex,
    });
  };

  changeSelectedSwatchHexValue = (updatedHexValue) => {
    const {hexValues, selectedSwatchIndex} = this.state;

    // Update the current hex value.
    const updatedHexValues = _.clone(hexValues);
    updatedHexValues[selectedSwatchIndex] = updatedHexValue;

    this.setState({
      hexValues: updatedHexValues,
    });
  };

  changeSelectedImageEditorHexValue = (hexValue) => {
    this.setState({
      selectedImageEditorHexValue: hexValue,
    });
  };

  setPixelToSelectedSwatchHexValue = (rowId, columnId) => {
    const {selectedSwatchIndex, pixelHexValueIndexes} = this.state;

    const updatedPixelHexValueIndexes = _.clone(pixelHexValueIndexes);
    updatedPixelHexValueIndexes[rowId][columnId] = selectedSwatchIndex;

    this.setState({
      pixelHexValueIndexes: updatedPixelHexValueIndexes,
    });
  };

  highlightPixels = (hexValueIndex) => {
    this.setState({
      highlightedPixelsHexValueIndex: hexValueIndex,
    });
  };

  unhighlightPixels = () => {
    this.setState({
      highlightedPixelsHexValueIndex: null,
    });
  };

  render() {
    const {sourceImage, setPixelatedImage, pixelDimensions} = this.props;
    const {
      hexValues,
      errorMessage,
      selectedSwatchIndex,
      pixelHexValueIndexes,
      highlightedPixelsHexValueIndex,
    } = this.state;

    let stepContent;
    if (errorMessage !== null) {
      stepContent = (
        <ErrorMessage>
          Failed to pixelate image!
          <br />
          {errorMessage}
          <br />
          Please try again.
        </ErrorMessage>
      );
    } else if (pixelHexValueIndexes === null) {
      stepContent = <Message>Pixelating image...</Message>;
    } else {
      const hexValueIndexPixelCounts = Array(hexValues.length).fill(0);

      pixelHexValueIndexes.forEach((row) => {
        row.forEach((hexValueIndex) => {
          hexValueIndexPixelCounts[hexValueIndex] += 1;
        });
      });

      stepContent = (
        <React.Fragment>
          <CardsAndButtonWrapper>
            <CardsWrapper>
              <SwatchesCard
                hexValues={hexValues}
                highlightPixels={this.highlightPixels}
                unhighlightPixels={this.unhighlightPixels}
                selectedSwatchIndex={selectedSwatchIndex}
                setSelectedSwatchIndex={this.setSelectedSwatchIndex}
                hexValueIndexPixelCounts={hexValueIndexPixelCounts}
              />

              <ColorPickerCard
                hexValues={hexValues}
                selectedSwatchIndex={selectedSwatchIndex}
                changeSelectedSwatchHexValue={this.changeSelectedSwatchHexValue}
              />
            </CardsWrapper>
            <SetColorsButton
              onClick={() =>
                setPixelatedImage({
                  hexValues,
                  pixelHexValueIndexes,
                })
              }
            >
              Set Colors
            </SetColorsButton>
          </CardsAndButtonWrapper>
          <PixelatedImage
            hexValues={hexValues}
            sourceImage={sourceImage}
            pixelDimensions={pixelDimensions}
            selectedSwatchIndex={selectedSwatchIndex}
            pixelHexValueIndexes={pixelHexValueIndexes}
            highlightedPixelsHexValueIndex={highlightedPixelsHexValueIndex}
            setPixelToSelectedSwatchHexValue={this.setPixelToSelectedSwatchHexValue}
          />
        </React.Fragment>
      );
    }

    return <ContentWrapper>{stepContent}</ContentWrapper>;
  }
}

Step3.propTypes = {
  sourceImage: PropTypes.object.isRequired,
  pixelatedImage: PropTypes.object,
  pixelDimensions: PropTypes.object.isRequired,
  setPixelatedImage: PropTypes.func.isRequired,
};

export default Step3;

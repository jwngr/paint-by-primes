import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import PixelatedImage from './PixelatedImage';
import PencilColorCard from './PencilColorCard';
import SwatchColorPickersCard from './SwatchColorPickersCard';

import {pixelate} from '../../lib/pixelator.js';

import {CardsWrapper, ContentWrapper, SetColorsButton, CardsAndButtonWrapper} from './index.styles';

class Step3 extends React.Component {
  state = {
    hexValues: null,
    errorMessage: null,
    pixelHexValueIndexes: null,
    selectedImageEditorHexValue: null,
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
            selectedImageEditorHexValue: hexValues[0],
          });
        })
        .catch((error) => {
          this.setState({errorMessage: `Failed to pixelate image: ${error.message}`});
        });
    }
  }

  changeSwatchHexValue = (hexValueIndex, {hex: updatedHexValue}) => {
    const {hexValues, selectedImageEditorHexValue} = this.state;

    const priorHexValue = hexValues[hexValueIndex];

    // Update the current hex value.
    const updatedHexValues = _.clone(hexValues);
    updatedHexValues[hexValueIndex] = updatedHexValue;

    const updatedState = {
      hexValues: updatedHexValues,
    };

    // Update the currently selected pen hex value if it is equal to the prior hex value and no
    // other swatch is that color.
    if (
      priorHexValue === selectedImageEditorHexValue &&
      _.filter(updatedHexValues, (val) => val === priorHexValue).length === 0
    ) {
      updatedState.selectedImageEditorHexValue = updatedHexValue;
    }

    this.setState(updatedState);
  };

  changeSelectedImageEditorHexValue = (hexValue) => {
    this.setState({
      selectedImageEditorHexValue: hexValue,
    });
  };

  changePixelHexValue = (rowId, columnId, updatedHexValue) => {
    const {hexValues, pixelHexValueIndexes} = this.state;

    const updatedPixelHexValueIndexes = _.clone(pixelHexValueIndexes);
    updatedPixelHexValueIndexes[rowId][columnId] = hexValues.indexOf(updatedHexValue);

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
      pixelHexValueIndexes,
      selectedImageEditorHexValue,
      highlightedPixelsHexValueIndex,
    } = this.state;

    // TODO: clean up.
    let stepContent;
    if (errorMessage !== null) {
      stepContent = <p>Error! {errorMessage}</p>;
    } else if (pixelHexValueIndexes === null) {
      stepContent = <p>Pixelating image...</p>;
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
              <SwatchColorPickersCard
                hexValues={hexValues}
                hexValueIndexPixelCounts={hexValueIndexPixelCounts}
                highlightPixels={this.highlightPixels}
                unhighlightPixels={this.unhighlightPixels}
                changeSwatchHexValue={this.changeSwatchHexValue}
              />

              <PencilColorCard
                hexValues={_.uniq(hexValues)}
                selectedImageEditorHexValue={selectedImageEditorHexValue}
                changeSelectedImageEditorHexValue={this.changeSelectedImageEditorHexValue}
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
            changePixelHexValue={this.changePixelHexValue}
            pixelHexValueIndexes={pixelHexValueIndexes}
            selectedImageEditorHexValue={selectedImageEditorHexValue}
            highlightedPixelsHexValueIndex={highlightedPixelsHexValueIndex}
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

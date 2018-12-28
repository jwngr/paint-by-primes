import _ from 'lodash';
import React from 'react';

import StepInstructions from '../StepInstructions';
import PixelatedImageEditor from '../PixelatedImageEditor';

import {pixelate} from '../../lib/pixelator.js';

class Step3 extends React.Component {
  state = {
    pixels: null,
    hexValues: null,
    errorMessage: null,
  };

  componentDidMount() {
    const {sourceImage, pixelDimensions, pixelatedImage, latestCompletedStep} = this.props;

    if (typeof pixelatedImage !== 'undefined' && latestCompletedStep >= 3) {
      this.setState({
        ...pixelatedImage,
      });
    } else {
      return pixelate(sourceImage.file, pixelDimensions)
        .then(({pixels, hexValues}) => {
          this.setState({
            pixels,
            hexValues,
            errorMessage: null,
          });
        })
        .catch((error) => {
          this.setState({errorMessage: `Failed to pixelate image: ${error.message}`});
        });
    }
  }

  changeHexValue = (hexValueIndex, updatedHexValue) => {
    const {hexValues} = this.state;

    const updatedHexValues = _.clone(hexValues);
    updatedHexValues[hexValueIndex] = updatedHexValue;

    this.setState({
      hexValues: updatedHexValues,
    });
  };

  changePixelHexValue = (rowId, columnId, updatedHexValue) => {
    const {pixels, hexValues} = this.state;

    const updatedPixels = _.clone(pixels);
    updatedPixels[rowId][columnId] = {
      hexValueIndex: hexValues.indexOf(updatedHexValue),
    };

    this.setState({
      pixels: updatedPixels,
    });
  };

  render() {
    const {pixels, hexValues, errorMessage} = this.state;
    const {setPixelatedImage, pixelDimensions} = this.props;

    const cellDimensions = {
      width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
    };

    // TODO: clean up.
    if (errorMessage !== null) {
      return <p>Error! {errorMessage}</p>;
    } else if (pixels === null) {
      return <p>Pixelating image...</p>;
    }

    return (
      <React.Fragment>
        <StepInstructions>
          <p>Define your color palette.</p>
          <p>Each color represents a unique digit.</p>
        </StepInstructions>

        <PixelatedImageEditor
          pixels={pixels}
          hexValues={hexValues}
          cellDimensions={cellDimensions}
          changeHexValue={this.changeHexValue}
          changePixelHexValue={this.changePixelHexValue}
          goToNextStep={() =>
            setPixelatedImage({
              pixels,
              hexValues,
            })
          }
        />
      </React.Fragment>
    );
  }
}

export default Step3;

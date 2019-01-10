import _ from 'lodash';
import React from 'react';

import StepInstructions from '../StepInstructions';
import PixelatedImageEditor from '../PixelatedImageEditor';

import {pixelate} from '../../lib/pixelator.js';

class Step3 extends React.Component {
  state = {
    hexValues: null,
    errorMessage: null,
    pixelHexValueIndexes: null,
  };

  componentDidMount() {
    const {sourceImage, pixelDimensions, pixelatedImage, latestCompletedStep} = this.props;

    if (typeof pixelatedImage !== 'undefined' && latestCompletedStep >= 3) {
      this.setState({
        ...pixelatedImage,
      });
    } else {
      return pixelate(sourceImage.file, pixelDimensions)
        .then(({hexValues, pixelHexValueIndexes}) => {
          this.setState({
            hexValues,
            pixelHexValueIndexes,
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
    const {hexValues, pixelHexValueIndexes} = this.state;

    const updatedPixelHexValueIndexes = _.clone(pixelHexValueIndexes);
    updatedPixelHexValueIndexes[rowId][columnId] = hexValues.indexOf(updatedHexValue);

    this.setState({
      pixelHexValueIndexes: updatedPixelHexValueIndexes,
    });
  };

  render() {
    const {hexValues, errorMessage, pixelHexValueIndexes} = this.state;
    const {setPixelatedImage, pixelDimensions} = this.props;

    const cellDimensions = {
      width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
    };

    // TODO: clean up.
    if (errorMessage !== null) {
      return <p>Error! {errorMessage}</p>;
    } else if (pixelHexValueIndexes === null) {
      return <p>Pixelating image...</p>;
    }

    return (
      <React.Fragment>
        <StepInstructions>
          <p>Define your color palette.</p>
          <p>Each color represents a unique digit.</p>
        </StepInstructions>

        <PixelatedImageEditor
          hexValues={hexValues}
          cellDimensions={cellDimensions}
          changeHexValue={this.changeHexValue}
          pixelHexValueIndexes={pixelHexValueIndexes}
          changePixelHexValue={this.changePixelHexValue}
          goToNextStep={() =>
            setPixelatedImage({
              hexValues,
              pixelHexValueIndexes,
            })
          }
        />
      </React.Fragment>
    );
  }
}

export default Step3;

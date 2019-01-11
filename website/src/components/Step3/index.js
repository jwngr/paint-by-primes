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
            pixelHexValueIndexes,
            errorMessage: null,
          });
        })
        .catch((error) => {
          this.setState({errorMessage: `Failed to pixelate image: ${error.message}`});
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
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
      width: Math.ceil(pixelDimensions.width * pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height * pixelDimensions.scaleFactor),
    };

    // TODO: clean up.
    let stepContent;
    if (errorMessage !== null) {
      stepContent = <p>Error! {errorMessage}</p>;
    } else if (pixelHexValueIndexes === null) {
      stepContent = <p>Pixelating image...</p>;
    } else {
      stepContent = (
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
      );
    }

    return (
      <div>
        <StepInstructions>
          <p>Define your color palette.</p>
          <p>Each color represents a unique digit.</p>
        </StepInstructions>

        {stepContent}
      </div>
    );
  }
}

export default Step3;

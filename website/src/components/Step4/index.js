import _ from 'lodash';
import React from 'react';
import uuidv4 from 'uuid/v4';

import DigitImageEditor from '../DigitImageEditor';
import StepInstructions from '../StepInstructions';
import {db} from '../../loadFirebase';

const DIGIT_ORDERING = [1, 8, 7, 0, 2, 6, 3, 9, 4, 5];

class Step4 extends React.Component {
  constructor(props) {
    super(props);

    const {digitMappings, pixelatedImage} = props;

    let hexValuesToDigits = {};
    let hexValueIndexesToDigits = [];
    if (digitMappings) {
      hexValuesToDigits = digitMappings.hexValuesToDigits;
      hexValueIndexesToDigits = digitMappings.hexValueIndexesToDigits;
    } else {
      pixelatedImage.hexValues.forEach((hexValue, i) => {
        const digit =
          hexValue in hexValuesToDigits
            ? hexValuesToDigits[hexValue]
            : DIGIT_ORDERING[_.size(hexValuesToDigits)];

        hexValueIndexesToDigits[i] = digit;
        hexValuesToDigits[hexValue] = digit;
      });
    }

    this.state = {
      errorMessage: null,
      isColorized: true,
      hexValuesToDigits,
      hexValueIndexesToDigits,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
  }

  changeHexValueDigit = (hexValue, newDigit) => {
    // TODO: handle first digit starting with 0.
    const {pixelatedImage} = this.props;
    const {hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    const updatedHexValuesToDigits = {
      ...hexValuesToDigits,
      [hexValue]: newDigit,
    };

    const updatedHexValueIndexesToDigits = hexValueIndexesToDigits.map((digit, i) => {
      return pixelatedImage.hexValues[i] === hexValue ? newDigit : digit;
    });

    this.setState({
      hexValuesToDigits: updatedHexValuesToDigits,
      hexValueIndexesToDigits: updatedHexValueIndexesToDigits,
    });
  };

  goToStep5 = () => {
    const {sourceImage, pixelatedImage, pixelDimensions, setDigitMappings} = this.props;
    const {hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    // Ensure each hex value has a unique digit assigned to it.
    let duplicateDigitEncountered = false;
    const digitsEncountered = new Set();
    _.forEach(hexValuesToDigits, (digit) => {
      if (digitsEncountered.has(digit)) {
        duplicateDigitEncountered = true;
      } else {
        digitsEncountered.add(digit);
      }
    });

    if (duplicateDigitEncountered) {
      this.setState({
        errorMessage:
          'Each color must be assigned a unique digit. If you want to merge colors, head back to the previous step.',
      });
    } else {
      const primeImageId = uuidv4();

      const digitMappings = {
        hexValuesToDigits,
        hexValueIndexesToDigits,
      };

      const pixelatedImageNoNestedArray = _.clone(pixelatedImage);
      pixelatedImageNoNestedArray.pixelHexValueIndexes = JSON.stringify(
        pixelatedImageNoNestedArray.pixelHexValueIndexes
      );

      db.doc(`primeImages/${primeImageId}`).set({
        sourceImage,
        digitMappings,
        pixelDimensions,
        pixelatedImage: pixelatedImageNoNestedArray,
      });

      setDigitMappings(digitMappings, primeImageId);
    }
  };

  render() {
    const {pixelatedImage, pixelDimensions} = this.props;
    const {errorMessage, hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    // TODO: clean up
    let errorContent;
    if (errorMessage !== null) {
      errorContent = <p className="error-message">{errorMessage}</p>;
    }

    const cellDimensions = {
      width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
    };

    return (
      <React.Fragment>
        <StepInstructions>
          <p>Assign a unique digit for each color.</p>
          <p>See how your image looks with and without colors.</p>
        </StepInstructions>

        {errorContent}

        <DigitImageEditor
          goToNextStep={this.goToStep5}
          cellDimensions={cellDimensions}
          hexValues={pixelatedImage.hexValues}
          hexValuesToDigits={hexValuesToDigits}
          hexValueIndexesToDigits={hexValueIndexesToDigits}
          pixelHexValueIndexes={pixelatedImage.pixelHexValueIndexes}
          changeHexValueDigit={this.changeHexValueDigit}
        />
      </React.Fragment>
    );
  }
}

export default Step4;

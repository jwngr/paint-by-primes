import _ from 'lodash';
import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';

import Button from '../Button';
import DigitImage from './DigitImage';
import SwatchDigitsCard from './SwatchDigitsCard';
import ColorizationControlCard from './ColorizationControlCard';

import {db, storage} from '../../loadFirebase';

import {CardsWrapper, ContentWrapper, CardsAndButtonWrapper} from './index.styles';

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
      hexValuesToDigits,
      hexValueIndexesToDigits,
      errorMessage: null,
      isDigitImageColorized: true,
    };
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

  toggleDigitImageColors = () => {
    this.setState(({isDigitImageColorized}) => ({
      isDigitImageColorized: !isDigitImageColorized,
    }));
  };

  savePrimeImageDataToFirebase = async (primeImageId, digitMappings) => {
    const {sourceImage, pixelatedImage, pixelDimensions} = this.props;

    // Stringify nested arrays since Firestore cannot handle them.
    const pixelatedImageNoNestedArray = _.clone(pixelatedImage);
    pixelatedImageNoNestedArray.pixelHexValueIndexes = JSON.stringify(
      pixelatedImageNoNestedArray.pixelHexValueIndexes
    );

    // TODO: write security rules for Firestore and Cloud Storage.
    // Save the source image to Cloud Storage.
    const storageSnap = await storage
      .ref()
      .child(`sourceImages/${primeImageId}`)
      .put(sourceImage.fileBlob);
    const downloadUrl = await storageSnap.ref.getDownloadURL();

    // Save the prime image data to Firestore.
    await db.doc(`primeImages/${primeImageId}`).set({
      sourceImage: {
        // TODO: hanlde no fileBlob being saved.
        fileUrl: downloadUrl,
        width: sourceImage.width,
        height: sourceImage.height,
      },
      digitMappings,
      pixelDimensions,
      pixelatedImage: pixelatedImageNoNestedArray,
    });
  };

  goToStep5 = async () => {
    const {setDigitMappings} = this.props;
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

      this.savePrimeImageDataToFirebase(primeImageId, digitMappings);

      setDigitMappings(digitMappings, primeImageId);
    }
  };

  render() {
    const {sourceImage, pixelatedImage, pixelDimensions} = this.props;
    const {
      errorMessage,
      hexValuesToDigits,
      isDigitImageColorized,
      hexValueIndexesToDigits,
    } = this.state;

    // TODO: clean up
    let errorContent;
    if (errorMessage !== null) {
      errorContent = <p className="error-message">{errorMessage}</p>;
    }

    const hasDuplicateDigits =
      _.size(hexValuesToDigits) !==
      _.chain(hexValuesToDigits)
        .values()
        .uniq()
        .size()
        .value();

    return (
      <React.Fragment>
        {errorContent}

        <ContentWrapper>
          <CardsAndButtonWrapper>
            <CardsWrapper>
              <SwatchDigitsCard
                hexValues={pixelatedImage.hexValues}
                hexValuesToDigits={hexValuesToDigits}
                changeHexValueDigit={this.changeHexValueDigit}
                hexValueIndexesToDigits={hexValueIndexesToDigits}
                resetEmptyHexValueIndex={this.resetEmptyHexValueIndex}
              />
              <ColorizationControlCard
                isDigitImageColorized={isDigitImageColorized}
                toggleDigitImageColors={this.toggleDigitImageColors}
              />
            </CardsWrapper>
            <Button onClick={this.goToStep5} isDisabled={hasDuplicateDigits}>
              Generate Prime Image
            </Button>
          </CardsAndButtonWrapper>
          <DigitImage
            sourceImage={sourceImage}
            isColorized={isDigitImageColorized}
            pixelDimensions={pixelDimensions}
            hexValues={pixelatedImage.hexValues}
            hexValueIndexesToDigits={hexValueIndexesToDigits}
            pixelHexValueIndexes={pixelatedImage.pixelHexValueIndexes}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

Step4.propTypes = {
  sourceImage: PropTypes.object.isRequired,
  digitMappings: PropTypes.object,
  pixelatedImage: PropTypes.object.isRequired,
  pixelDimensions: PropTypes.object.isRequired,
  setDigitMappings: PropTypes.func.isRequired,
};

export default Step4;

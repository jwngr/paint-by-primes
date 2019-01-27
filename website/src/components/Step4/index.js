import _ from 'lodash';
import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';

import Button from '../Button';
import DigitImage from './DigitImage';
import SwatchDigitsCard from './SwatchDigitsCard';
import ColorizationControlCard from './ColorizationControlCard';

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
      isDigitImageColorized: true,
      isGeneratingPrimeImage: false,
    };
  }

  changeHexValueDigit = (hexValue, newDigit) => {
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

  goToStep5 = async () => {
    const {setDigitMappings} = this.props;
    const {hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    const postId = uuidv4();

    const digitMappings = {
      hexValuesToDigits,
      hexValueIndexesToDigits,
    };

    setDigitMappings(digitMappings, postId);
  };

  render() {
    const {sourceImage, pixelatedImage, pixelDimensions} = this.props;
    const {
      hexValuesToDigits,
      isDigitImageColorized,
      isGeneratingPrimeImage,
      hexValueIndexesToDigits,
    } = this.state;

    const hasDuplicateDigits =
      _.size(hexValuesToDigits) !==
      _.chain(hexValuesToDigits)
        .values()
        .uniq()
        .size()
        .value();

    const firstHexValueIsZero = hexValueIndexesToDigits[0] === 0;

    return (
      <React.Fragment>
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
            <Button
              onClick={this.goToStep5}
              isDisabled={hasDuplicateDigits || firstHexValueIsZero || isGeneratingPrimeImage}
            >
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

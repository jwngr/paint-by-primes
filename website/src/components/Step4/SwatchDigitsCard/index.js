import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Warning from '../../svgs/Warning';
import CardFooter from '../../Card/CardFooter';
import {CardBody, CardInstruction} from '../../Card';

import {
  Swatch,
  Asterisk,
  SwatchWrapper,
  SwatchesWrapper,
  SwatchDigitsCardWrapper,
} from './index.styles';

import {colors} from '../../../resources/theme.json';

class SwatchDigitsCard extends React.PureComponent {
  state = {
    emptyHexValue: null,
  };

  changeSwatchDigit = (event, hexValue) => {
    const {hexValuesToDigits, changeHexValueDigit} = this.props;

    // Ensure the updated value is a single digit and that it is the most recently pressed digit.
    let updatedValue = event.target.value;
    if (updatedValue.length > 1) {
      updatedValue = updatedValue.replace(hexValuesToDigits[hexValue], '');
    }

    this.setState({
      emptyHexValue: updatedValue === '' ? hexValue : null,
    });

    if (updatedValue !== '') {
      const updatedDigit = Number(updatedValue);

      if (!isNaN(updatedDigit) && updatedDigit >= 0 && updatedDigit <= 9) {
        changeHexValueDigit(hexValue, updatedDigit);
      }
    }
  };

  resetEmptyHexValue = () => {
    this.setState({
      emptyHexValue: null,
    });
  };

  clearFocusedInput = (focusedHexValue) => {
    this.setState({
      emptyHexValue: focusedHexValue,
    });
  };

  render() {
    const {emptyHexValue} = this.state;
    const {hexValues, hexValuesToDigits, hexValueIndexesToDigits} = this.props;

    const hasDuplicateDigits =
      _.size(hexValuesToDigits) !==
      _.chain(hexValuesToDigits)
        .values()
        .uniq()
        .size()
        .value();

    const firstHexValueIsZero = hexValueIndexesToDigits[0] === 0;

    return (
      <SwatchDigitsCardWrapper>
        <CardInstruction>
          Assign digits to your colors by clicking and typing on the swatches below.
        </CardInstruction>
        <CardBody>
          <SwatchesWrapper>
            {_.uniq(hexValues).map((hexValue, i) => {
              const digit = hexValuesToDigits[hexValue];

              const isDuplicateDigit =
                _.filter(hexValuesToDigits, (val) => val === digit).length !== 1;
              const isFirstDigitAndIsZero = i === 0 && digit === 0;

              let asterisk;
              if (isDuplicateDigit || isFirstDigitAndIsZero) {
                asterisk = (
                  <Asterisk hexValue={hexValue}>
                    <Warning />
                  </Asterisk>
                );
              }

              const inputValue = emptyHexValue === hexValue ? '' : Number(digit).toString();

              return (
                <SwatchWrapper key={`digit-image-editor-swatch-${hexValue.replace('#', '')}`}>
                  <Swatch hexValue={hexValue}>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(event) => this.changeSwatchDigit(event, hexValue)}
                      onBlur={this.resetEmptyHexValue}
                      onFocus={() => this.clearFocusedInput(hexValue)}
                    />
                    {emptyHexValue !== hexValue && asterisk}
                  </Swatch>
                </SwatchWrapper>
              );
            })}
          </SwatchesWrapper>
        </CardBody>
        <CardFooter
          type="info"
          text="Thick numbers (0, 6, 8, 9) stand out well against thin numbers (1, 7)."
        />
        {hasDuplicateDigits && (
          <CardFooter
            type="error"
            text="Each color must be assigned a unique digit."
            color={colors.red.darker}
          />
        )}
        {firstHexValueIsZero && (
          <CardFooter
            type="error"
            text="First digit in the prime image cannot be a 0."
            color={colors.red.darker}
          />
        )}
      </SwatchDigitsCardWrapper>
    );
  }
}

SwatchDigitsCard.propTypes = {
  hexValues: PropTypes.array.isRequired,
  hexValuesToDigits: PropTypes.object.isRequired,
  emptyHexValueIndex: PropTypes.number,
  changeHexValueDigit: PropTypes.func.isRequired,
  hexValueIndexesToDigits: PropTypes.array.isRequired,
};

export default SwatchDigitsCard;

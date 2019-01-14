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
    emptyHexValueIndex: null,
  };

  changeSwatchDigit = (event, hexValue) => {
    const {hexValues, hexValuesToDigits, changeHexValueDigit} = this.props;

    const updatedValue = event.target.value.replace(hexValuesToDigits[hexValue], '');

    this.setState({
      emptyHexValueIndex: updatedValue === '' ? hexValues.indexOf(hexValue) : null,
    });

    if (updatedValue !== '') {
      const updatedDigit = Number(updatedValue);

      if (!isNaN(updatedDigit) && updatedDigit >= 0 && updatedDigit <= 9) {
        changeHexValueDigit(hexValue, updatedDigit);
      }
    }
  };

  resetEmptyHexValueIndex = () => {
    this.setState({
      emptyHexValueIndex: null,
    });
  };

  render() {
    const {hexValues, emptyHexValueIndex, hexValuesToDigits, hexValueIndexesToDigits} = this.props;

    const hasDuplicateDigits =
      hexValueIndexesToDigits.length !== _.uniq(hexValueIndexesToDigits).length;

    return (
      <SwatchDigitsCardWrapper>
        <CardInstruction>
          Assign digits to your colors by clicking and typing on the swatches below.
        </CardInstruction>
        <CardBody>
          <SwatchesWrapper>
            {_.uniq(hexValues).map((hexValue, i) => {
              const hexValueIndex = hexValues.indexOf(hexValue);

              const asterisk =
                _.filter(
                  hexValuesToDigits,
                  (digit) => digit === hexValueIndexesToDigits[hexValueIndex]
                ).length === 1 ? null : (
                  <Asterisk hexValue={hexValue}>
                    <Warning />
                  </Asterisk>
                );

              const inputValue =
                emptyHexValueIndex === hexValueIndex ? '' : hexValueIndexesToDigits[hexValueIndex];

              return (
                <SwatchWrapper key={`digit-image-editor-swatch-${i}`}>
                  <Swatch hexValue={hexValue}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(event) => this.changeSwatchDigit(event, hexValue)}
                      onBlur={this.resetEmptyHexValueIndex}
                    />
                    {emptyHexValueIndex !== hexValueIndex && asterisk}
                  </Swatch>
                </SwatchWrapper>
              );
            })}
          </SwatchesWrapper>
        </CardBody>
        <CardFooter
          type="info"
          text="Thick numbers like 0, 6, 8, and 9 stand out well against thin numbers like 1 and 7."
        />
        {hasDuplicateDigits && (
          <CardFooter
            type="error"
            text="Each color must be assigned a unique digit."
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

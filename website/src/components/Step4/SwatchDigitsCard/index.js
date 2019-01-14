import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {CardBody, CardInstruction} from '../../Card';

import {
  Swatch,
  Asterisk,
  Footnote,
  SwatchWrapper,
  SwatchesWrapper,
  SwatchDigitsCardWrapper,
} from './index.styles';

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

    return (
      <SwatchDigitsCardWrapper>
        <CardInstruction>Click and type on a swatch to set its digit.</CardInstruction>
        <CardBody>
          <SwatchesWrapper>
            {_.uniq(hexValues).map((hexValue, i) => {
              const hexValueIndex = hexValues.indexOf(hexValue);

              const asterisk =
                _.filter(
                  hexValuesToDigits,
                  (digit) => digit === hexValueIndexesToDigits[hexValueIndex]
                ).length === 1 ? null : (
                  <Asterisk hexValue={hexValue}>*</Asterisk>
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

          <Footnote>
            <i>* Each color must be assigned a unique digit.</i>
          </Footnote>
        </CardBody>
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

import _ from 'lodash';
import React from 'react';
import {darken} from 'polished';
import PropTypes from 'prop-types';

import Button from '../Button';

import {getHsp} from '../../lib/utils';

import {
  Swatch,
  Asterisk,
  Footnote,
  Swatches,
  SwatchWrapper,
  PixelatedImage,
  SubInstruction,
  SwatchesWrapper,
  DigitImageEditorCell,
  PixelatedImageWrapper,
  DigitImageEditorWrapper,
} from './index.styles';
import colors from '../../resources/colors.json';

class DigitImageEditor extends React.Component {
  state = {
    isColorized: true,
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

  toggleIsColorized = () => {
    this.setState(({isColorized}) => ({
      isColorized: !isColorized,
    }));
  };

  render() {
    const {isColorized, emptyHexValueIndex} = this.state;
    const {
      hexValues,
      goToNextStep,
      cellDimensions,
      hexValuesToDigits,
      pixelHexValueIndexes,
      hexValueIndexesToDigits,
    } = this.props;

    const numRows = pixelHexValueIndexes.length;
    const numColumns = pixelHexValueIndexes[0].length;

    const editorCells = [];
    pixelHexValueIndexes.forEach((row, rowId) => {
      row.forEach((hexValueIndex, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        editorCells.push(
          <DigitImageEditorCell
            hexValue={hexValue}
            key={`digit-image-editor-cell-${rowId}-${columnId}`}
          >
            {hexValueIndexesToDigits[hexValueIndex]}
          </DigitImageEditorCell>
        );
      });
    });

    return (
      <DigitImageEditorWrapper>
        <SwatchesWrapper>
          <SubInstruction>Click and type on a swatch to set its digit.</SubInstruction>
          <Swatches>
            {_.uniq(hexValues).map((hexValue, i) => {
              const hexValueIndex = hexValues.indexOf(hexValue);

              const hsp = getHsp(hexValue);
              const fontColor = hsp > 170 ? colors.gray.darkest : colors.gray.lightest;

              const asterisk =
                _.filter(
                  hexValuesToDigits,
                  (digit) => digit === hexValueIndexesToDigits[hexValueIndex]
                ).length === 1 ? null : (
                  <Asterisk style={{color: fontColor}}>*</Asterisk>
                );

              const inputValue =
                emptyHexValueIndex === hexValueIndex ? '' : hexValueIndexesToDigits[hexValueIndex];

              return (
                <SwatchWrapper key={`digit-image-editor-swatch-${i}`}>
                  <Swatch>
                    <input
                      type="text"
                      value={inputValue}
                      style={{
                        backgroundColor: hexValue,
                        border: `solid 2px ${darken(0.2, hexValue)}`,
                        color: fontColor,
                      }}
                      onChange={(event) => this.changeSwatchDigit(event, hexValue)}
                      onBlur={this.resetEmptyHexValueIndex}
                    />
                    {emptyHexValueIndex !== hexValueIndex && asterisk}
                  </Swatch>
                </SwatchWrapper>
              );
            })}
          </Swatches>

          <Footnote>
            <i>* Each color must be assigned a unique digit.</i>
          </Footnote>

          <Button onClick={goToNextStep}>Generate Prime Image</Button>
        </SwatchesWrapper>

        <PixelatedImageWrapper>
          <SubInstruction>
            Click on the image to {isColorized ? 'turn off' : 'turn on'} the colors.
          </SubInstruction>
          <PixelatedImage
            numRows={numRows}
            numColumns={numColumns}
            cellWidth={cellDimensions.width}
            cellHeight={cellDimensions.height}
            isColorized={isColorized}
            onClick={this.toggleIsColorized}
          >
            {editorCells}
          </PixelatedImage>
        </PixelatedImageWrapper>
      </DigitImageEditorWrapper>
    );
  }
}

DigitImageEditor.propTypes = {
  hexValues: PropTypes.array.isRequired,
  hexValuesToDigits: PropTypes.object.isRequired,
  changeHexValueDigit: PropTypes.func.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
  hexValueIndexesToDigits: PropTypes.array.isRequired,
};

export default DigitImageEditor;

import _ from 'lodash';
import React from 'react';
import {darken} from 'polished';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';

import Button from '../Button';

import {getHsp} from '../../lib/utils';

import {
  Swatch,
  Swatches,
  Footnote,
  ColorPicker,
  SwatchWrapper,
  SubInstruction,
  PixelatedImage,
  SwatchesWrapper,
  PixelatedImageEditorCell,
  PixelatedImageEditorWrapper,
  PixelatedImageEditorCellWrapper,
} from './index.styles';

class PixelatedImageEditor extends React.Component {
  state = {
    colorPickerSwatchIndex: null,
    highlightedPixelsHexValueIndex: null,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.closeColorPicker);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeColorPicker);
  }

  highlightPixels = (hexValueIndex) => {
    this.setState({
      highlightedPixelsHexValueIndex: hexValueIndex,
    });
  };

  unhighlightPixels = () => {
    this.setState({
      highlightedPixelsHexValueIndex: null,
    });
  };

  closeColorPicker = (event) => {
    if (!this.node || (event.target !== this.node && !this.node.contains(event.target))) {
      this.setState({
        colorPickerSwatchIndex: null,
      });
    }
  };

  changeColorPickerSwatchIndex = (newIndex) => {
    this.setState({
      colorPickerSwatchIndex: newIndex,
    });
  };

  render() {
    const {colorPickerSwatchIndex, highlightedPixelsHexValueIndex} = this.state;
    const {
      pixels,
      hexValues,
      goToNextStep,
      changeHexValue,
      cellDimensions,
      cyclePixelHexValue,
    } = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const hexValueIndexPixelCounts = {};

    const editorCells = [];
    pixels.forEach((row, rowId) => {
      row.forEach(({hexValueIndex}, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        hexValueIndexPixelCounts[hexValueIndex] =
          (hexValueIndexPixelCounts[hexValueIndex] || 0) + 1;

        editorCells.push(
          <PixelatedImageEditorCellWrapper key={`pixelated-image-editor-cell-${rowId}-${columnId}`}>
            <PixelatedImageEditorCell
              hexValue={hexValue}
              hasReducedOpacity={
                highlightedPixelsHexValueIndex !== null &&
                highlightedPixelsHexValueIndex !== hexValueIndex
              }
              onClick={() => cyclePixelHexValue(rowId, columnId, hexValueIndex)}
            />
          </PixelatedImageEditorCellWrapper>
        );
      });
    });

    return (
      <PixelatedImageEditorWrapper>
        <SwatchesWrapper>
          <SubInstruction>Click on a swatch to change its color.</SubInstruction>
          <Swatches>
            {hexValues.map((hexValue, i) => {
              const pixelCount = hexValueIndexPixelCounts[i];
              const pixelOrPixels = pixelCount === 1 ? 'pixel' : 'pixels';

              const asteriskColor = getHsp(hexValue) > 170 ? darken(0.2, hexValue) : hexValue;

              const asterisk =
                _.filter(hexValues, (current) => hexValue === current).length === 1 ? null : (
                  <span style={{color: asteriskColor}}>*</span>
                );

              return (
                <SwatchWrapper key={`pixelated-image-editor-swatch-${i}`}>
                  <Swatch
                    style={{
                      backgroundColor: hexValue,
                      border: `solid 2px ${darken(0.2, hexValue)}`,
                    }}
                    onClick={() => this.changeColorPickerSwatchIndex(i)}
                    onMouseEnter={() => this.highlightPixels(i)}
                    onMouseLeave={() => this.unhighlightPixels()}
                  >
                    {colorPickerSwatchIndex === i && (
                      <ColorPicker ref={(node) => (this.node = node)}>
                        <SketchPicker
                          color={hexValue}
                          disableAlpha={true}
                          presetColors={_.uniq(hexValues)}
                          onChangeComplete={changeHexValue.bind(null, i)}
                        />
                      </ColorPicker>
                    )}
                  </Swatch>
                  <p>
                    {pixelCount} {pixelOrPixels}
                    {asterisk}
                  </p>
                </SwatchWrapper>
              );
            })}
          </Swatches>
          <Footnote>
            <i>* Same colored swatches are assigned the same digit.</i>
          </Footnote>
          <Button onClick={goToNextStep}>Set Colors</Button>
        </SwatchesWrapper>

        <div>
          <SubInstruction>Click on a pixel to cycle through the colors.</SubInstruction>
          <PixelatedImage
            numRows={numRows}
            numColumns={numColumns}
            cellWidth={cellDimensions.width}
            cellHeight={cellDimensions.height}
          >
            {editorCells}
          </PixelatedImage>
        </div>
      </PixelatedImageEditorWrapper>
    );
  }
}

PixelatedImageEditor.propTypes = {
  pixels: PropTypes.array.isRequired,
  hexValues: PropTypes.array.isRequired,
  changeHexValue: PropTypes.func.isRequired,
  cyclePixelHexValue: PropTypes.func.isRequired,
};

export default PixelatedImageEditor;

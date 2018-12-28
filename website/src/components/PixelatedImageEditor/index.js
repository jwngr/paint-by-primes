import _ from 'lodash';
import React from 'react';
import {darken} from 'polished';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';

import Button from '../Button';

import {getHsp} from '../../lib/utils';
import pencilIcon from '../../images/pencil.png';

import {
  Swatch,
  Asterisk,
  Swatches,
  Footnote,
  ColorPicker,
  SwatchWrapper,
  PenColorSwatch,
  SubInstruction,
  PixelatedImage,
  SwatchesWrapper,
  RightContentWrapper,
  PenColorSwatchesWrapper,
  PixelatedImageEditorCell,
  PixelatedImageEditorWrapper,
  PixelatedImageEditorCellWrapper,
} from './index.styles';

class PixelatedImageEditor extends React.Component {
  constructor(props) {
    super(props);

    const {hexValues} = props;

    this.state = {
      colorPickerSwatchIndex: null,
      selectedImageEditorHexValue: hexValues[0],
      highlightedPixelsHexValueIndex: null,
    };

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

  changeSwatchHexValue = (hexValueIndex, {hex: updatedHexValue}) => {
    const {hexValues, changeHexValue} = this.props;
    const {selectedImageEditorHexValue} = this.state;

    changeHexValue(hexValueIndex, updatedHexValue);

    if (
      hexValues[hexValueIndex] === selectedImageEditorHexValue &&
      _.filter(hexValues, (val) => val === selectedImageEditorHexValue).length === 1
    ) {
      this.setState({
        selectedImageEditorHexValue: updatedHexValue,
      });
    }
  };

  changeColorPickerSwatchIndex = (newIndex) => {
    this.setState({
      colorPickerSwatchIndex: newIndex,
    });
  };

  changeSelectedImageEditorHexValue = (hexValue) => {
    this.setState({
      selectedImageEditorHexValue: hexValue,
    });
  };

  render() {
    const {
      selectedImageEditorHexValue,
      colorPickerSwatchIndex,
      highlightedPixelsHexValueIndex,
    } = this.state;
    const {pixels, hexValues, goToNextStep, cellDimensions, changePixelHexValue} = this.props;

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
              hoverHexValue={selectedImageEditorHexValue}
              hasReducedOpacity={
                highlightedPixelsHexValueIndex !== null &&
                highlightedPixelsHexValueIndex !== hexValueIndex
              }
              onClick={() => changePixelHexValue(rowId, columnId, selectedImageEditorHexValue)}
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
                  <Asterisk color={asteriskColor}>*</Asterisk>
                );

              return (
                <SwatchWrapper key={`pixelated-image-editor-swatch-${i}`}>
                  <Swatch
                    hexValue={hexValue}
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
                          onChangeComplete={this.changeSwatchHexValue.bind(null, i)}
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

        <RightContentWrapper>
          <SubInstruction>
            Click on a pixel to change its color to the selected color.
          </SubInstruction>
          <PenColorSwatchesWrapper>
            {_.uniq(hexValues).map((hexValue) => {
              const isSelected = hexValue === selectedImageEditorHexValue;
              return (
                <PenColorSwatch
                  key={`pen-color-swatch-${hexValue.replace('#', '')}`}
                  hexValue={hexValue}
                  isSelected={isSelected}
                  onClick={() => this.changeSelectedImageEditorHexValue(hexValue)}
                >
                  {isSelected && <img src={pencilIcon} alt="Selected swatch icon" />}
                </PenColorSwatch>
              );
            })}
          </PenColorSwatchesWrapper>
          <PixelatedImage
            numRows={numRows}
            numColumns={numColumns}
            cellWidth={cellDimensions.width}
            cellHeight={cellDimensions.height}
          >
            {editorCells}
          </PixelatedImage>
        </RightContentWrapper>
      </PixelatedImageEditorWrapper>
    );
  }
}

PixelatedImageEditor.propTypes = {
  pixels: PropTypes.array.isRequired,
  hexValues: PropTypes.array.isRequired,
  changeHexValue: PropTypes.func.isRequired,
  changePixelHexValue: PropTypes.func.isRequired,
};

export default PixelatedImageEditor;

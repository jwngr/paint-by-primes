import _ from 'lodash';
import React from 'react';
import {darken} from 'polished';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';

import Button from '../Button';
import {CardBody, CardInstruction} from '../Card';

import {getHsp, getNumberWithCommas} from '../../lib/utils';

import {
  Swatch,
  Asterisk,
  Swatches,
  Footnote,
  PencilIcon,
  ColorPicker,
  SwatchWrapper,
  PenColorSwatch,
  PixelatedImage,
  ControlsWrapper,
  PixelColorsCard,
  SwatchColorsCard,
  EmptySwatchWrapper,
  RightContentWrapper,
  PenColorSwatchWrapper,
  PenColorSwatchesWrapper,
  PixelatedImageEditorCell,
  ControlsAndButtonWrapper,
  EmptyPenColorSwatchWrapper,
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
    const {
      hexValues,
      goToNextStep,
      cellDimensions,
      changePixelHexValue,
      pixelHexValueIndexes,
    } = this.props;

    const numRows = pixelHexValueIndexes.length;
    const numColumns = pixelHexValueIndexes[0].length;

    const hexValueIndexPixelCounts = {};

    const editorCells = [];
    pixelHexValueIndexes.forEach((row, rowId) => {
      row.forEach((hexValueIndex, columnId) => {
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
        <ControlsAndButtonWrapper>
          <ControlsWrapper>
            <SwatchColorsCard>
              <CardInstruction>Click on a swatch below to change its color.</CardInstruction>
              <CardBody>
                <Swatches>
                  {hexValues.map((hexValue, i) => {
                    const pixelCount = hexValueIndexPixelCounts[i];

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
                          {getNumberWithCommas(pixelCount)}
                          {asterisk}
                        </p>
                      </SwatchWrapper>
                    );
                  })}
                  {_.range(0, 10 - hexValues.length).map((i) => (
                    <EmptySwatchWrapper key={`empty-swatch-wrapper-${i}`} />
                  ))}
                </Swatches>
                <Footnote>
                  <i>* Same colored swatches will be assigned the same digit.</i>
                </Footnote>
              </CardBody>
            </SwatchColorsCard>
            <PixelColorsCard>
              <CardInstruction>
                Click on a pixel in the image to the right to change it to the selected color below.
              </CardInstruction>
              <CardBody>
                <PenColorSwatchesWrapper>
                  {_.uniq(hexValues).map((hexValue) => {
                    const isSelected = hexValue === selectedImageEditorHexValue;
                    return (
                      <PenColorSwatchWrapper>
                        <PenColorSwatch
                          key={`pen-color-swatch-${hexValue.replace('#', '')}`}
                          hexValue={hexValue}
                          isSelected={isSelected}
                          onClick={() => this.changeSelectedImageEditorHexValue(hexValue)}
                        >
                          {isSelected && (
                            <PencilIcon viewBox="0 0 32 32" hexValue={hexValue}>
                              <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
                            </PencilIcon>
                          )}
                        </PenColorSwatch>
                      </PenColorSwatchWrapper>
                    );
                  })}
                  {_.range(0, 10 - hexValues.length).map((i) => (
                    <EmptyPenColorSwatchWrapper key={`empty-pen-color-swatch-wrapper-${i}`} />
                  ))}
                </PenColorSwatchesWrapper>
              </CardBody>
            </PixelColorsCard>
          </ControlsWrapper>
          <Button onClick={goToNextStep}>Set Colors</Button>
        </ControlsAndButtonWrapper>

        <RightContentWrapper>
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
  hexValues: PropTypes.array.isRequired,
  changeHexValue: PropTypes.func.isRequired,
  changePixelHexValue: PropTypes.func.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
};

export default PixelatedImageEditor;

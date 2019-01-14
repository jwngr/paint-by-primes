import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';

import {CardBody, CardInstruction} from '../../Card';

import {getNumberWithCommas} from '../../../lib/utils';

import {
  Swatch,
  Asterisk,
  Footnote,
  ColorPicker,
  SwatchWrapper,
  SwatchesWrapper,
  EmptySwatchWrapper,
  SwatchColorPickersCardWrapper,
} from './index.styles';

class SwatchColorPickersCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      colorPickerSwatchIndex: null,
    };

    document.body.addEventListener('click', this.closeColorPicker);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeColorPicker);
  }

  changeColorPickerSwatchIndex = (newIndex) => {
    this.setState({
      colorPickerSwatchIndex: newIndex,
    });
  };

  closeColorPicker = (event) => {
    const {colorPickerSwatchIndex} = this.props;

    if (
      colorPickerSwatchIndex !== null &&
      (!this.colorPickerNode ||
        (event.target !== this.colorPickerNode && !this.colorPickerNode.contains(event.target)))
    ) {
      this.changeColorPickerSwatchIndex(null);
    }
  };

  render() {
    const {
      hexValues,
      highlightPixels,
      unhighlightPixels,
      changeSwatchHexValue,
      hexValueIndexPixelCounts,
    } = this.props;

    const {colorPickerSwatchIndex} = this.state;

    return (
      <SwatchColorPickersCardWrapper>
        <CardInstruction>Click on a swatch below to change its color.</CardInstruction>
        <CardBody>
          <SwatchesWrapper>
            {hexValues.map((hexValue, i) => {
              const pixelCount = hexValueIndexPixelCounts[i];

              const asterisk =
                _.filter(hexValues, (current) => hexValue === current).length === 1 ? null : (
                  <Asterisk hexValue={hexValue}>*</Asterisk>
                );

              return (
                <SwatchWrapper key={`pixelated-image-editor-swatch-${i}`}>
                  <Swatch
                    hexValue={hexValue}
                    onClick={() => this.changeColorPickerSwatchIndex(i)}
                    onMouseEnter={() => highlightPixels(i)}
                    onMouseLeave={() => unhighlightPixels()}
                  >
                    {colorPickerSwatchIndex === i && (
                      <ColorPicker ref={(node) => (this.colorPickerNode = node)}>
                        <SketchPicker
                          color={hexValue}
                          disableAlpha={true}
                          presetColors={_.uniq(hexValues)}
                          onChangeComplete={changeSwatchHexValue.bind(null, i)}
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
          </SwatchesWrapper>
          <Footnote>
            <i>* Same colored swatches will be assigned the same digit.</i>
          </Footnote>
        </CardBody>
      </SwatchColorPickersCardWrapper>
    );
  }
}

SwatchColorPickersCard.propTypes = {
  hexValues: PropTypes.array.isRequired,
  highlightPixels: PropTypes.func.isRequired,
  unhighlightPixels: PropTypes.func.isRequired,
  changeSwatchHexValue: PropTypes.func.isRequired,
  hexValueIndexPixelCounts: PropTypes.array.isRequired,
};

export default SwatchColorPickersCard;
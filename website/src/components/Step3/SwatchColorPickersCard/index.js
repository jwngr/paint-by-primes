import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';

import Info from '../../svgs/Info';
import CardFooter from '../../Card/CardFooter';
import {CardBody, CardInstruction} from '../../Card';

import {getNumberWithCommas} from '../../../lib/utils';

import {
  Swatch,
  Asterisk,
  ColorPicker,
  SwatchWrapper,
  SwatchesWrapper,
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
        <CardInstruction>
          Define your color palette by clicking on the swatches below.
        </CardInstruction>
        <CardBody>
          <SwatchesWrapper>
            {hexValues.map((hexValue, i) => {
              let pixelCount = hexValueIndexPixelCounts[i];
              if (pixelCount > 1000) {
                const thousandsPlace = (pixelCount / 1000).toFixed(0);
                const hundredsPlace = Math.round((pixelCount % 1000) / 100);
                pixelCount = `${thousandsPlace}.${hundredsPlace}k`;
              }

              const asterisk =
                _.filter(hexValues, (current) => hexValue === current).length === 1 ? null : (
                  <Asterisk
                    hexValue={hexValue}
                    title="All swatches of this color will be assigned the same digit."
                  >
                    <Info />
                  </Asterisk>
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
          </SwatchesWrapper>
        </CardBody>
        <CardFooter type="info" text="Same colored swatches will be assigned the same digit." />
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

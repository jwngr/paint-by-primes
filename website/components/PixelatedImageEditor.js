import {darken} from 'polished';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {SketchPicker} from 'react-color';

import Button from './Button';

import {getHsp} from '../utils';
import colors from '../resources/colors.json';

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
    pixels.map((row, rowId) => {
      row.map(({hexValueIndex}, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: true,
          'cell-no-top-border': rowId === 0,
          'cell-no-left-border': columnId === 0,
          highlighted: highlightedPixelsHexValueIndex === hexValueIndex,
        });

        hexValueIndexPixelCounts[hexValueIndex] =
          (hexValueIndexPixelCounts[hexValueIndex] || 0) + 1;

        editorCells.push(
          <div style={{backgroundColor: 'white', position: 'relative'}}>
            <div
              key={`row-${rowId}-col-${columnId}`}
              className={cellClasses}
              onClick={() => cyclePixelHexValue(rowId, columnId, hexValueIndex)}
            />
          </div>
        );
      });
    });

    return (
      <React.Fragment>
        <div className="pixelated-image-editor">
          <div className="swatches-wrapper">
            <p className="sub-instruction">Click on a swatch to change its color.</p>
            <div className="swatches">
              {hexValues.map((hexValue, i) => {
                const pixelCount = hexValueIndexPixelCounts[i];
                const pixelOrPixels = pixelCount === 1 ? 'pixel' : 'pixels';

                const asteriskColor = getHsp(hexValue) > 170 ? darken(0.2, hexValue) : hexValue;

                const asterisk =
                  _.filter(hexValues, (current) => hexValue === current).length === 1 ? null : (
                    <span style={{color: asteriskColor}}>*</span>
                  );

                return (
                  <div className="swatch-wrapper" key={`swatch-${i}`}>
                    <div
                      className="swatch"
                      style={{
                        backgroundColor: hexValue,
                        border: `solid 2px ${darken(0.2, hexValue)}`,
                      }}
                      onClick={() => this.changeColorPickerSwatchIndex(i)}
                      onMouseEnter={() => this.highlightPixels(i)}
                      onMouseLeave={() => this.unhighlightPixels()}
                    >
                      {colorPickerSwatchIndex === i && (
                        <div className="color-picker" ref={(node) => (this.node = node)}>
                          <SketchPicker
                            color={hexValue}
                            disableAlpha={true}
                            presetColors={_.uniq(hexValues)}
                            onChangeComplete={changeHexValue.bind(null, i)}
                          />
                        </div>
                      )}
                    </div>
                    <p>
                      {pixelCount} {pixelOrPixels}
                      {asterisk}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="footnote">
              <i>* Same colored swatches are assigned the same digit.</i>
            </p>
            <Button onClick={goToNextStep}>Set Colors</Button>
          </div>

          <div className="pixelated-image-wrapper">
            <p className="sub-instruction">Click on a pixel to cycle through the colors.</p>
            <div className={`pixelated-image ${highlightedPixelsHexValueIndex && 'has-highlight'}`}>
              {editorCells}
            </div>
          </div>
        </div>
        <style jsx global>{`
          .pixelated-image-editor {
            display: flex;
            flex-direction: row;
            color: ${colors.blue.medium};
          }

          .pixelated-image-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .pixelated-image {
            display: grid;
            grid-gap: 1px;
            background-color: ${colors.gray.darkest}60;
            border: solid 6px ${colors.blue.medium};
            grid-template-rows: repeat(${numRows}, ${cellDimensions.height}px);
            grid-template-columns: repeat(${numColumns}, ${cellDimensions.width}px);
          }

          .cell {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0.5;
          }

          .pixelated-image.has-highlight .cell:not(.highlighted) {
            opacity: 0.2;
            border: none;
          }

          .cell-no-top-border {
            border-top: none;
          }

          .cell-no-left-border {
            border-left: none;
          }

          ${hexValues
            .map((hexValue) => {
              return `.cell-${hexValue.replace('#', '')} {
              background-color: ${hexValue};
            }`;
            })
            .join('\n')}

          .cell:hover {
            border: solid 2px ${colors.peach.darker};
            z-index: 100;
            opacity: 1;
          }

          .swatches-wrapper {
            width: 360px;
            margin-right: 28px;
          }

          .sub-instruction {
            font-size: 18px;
            margin-bottom: 8px;
          }

          .footnote {
            font-size: 14px;
            color: ${colors.gray.medium};
            margin: 8px 0 32px 0;
          }

          .swatches {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
          }

          .swatch-wrapper {
            width: 50%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }

          .swatch {
            cursor: pointer;
            width: 40px;
            height: 40px;
            margin: 12px;
            user-select: none;
            position: relative;
          }

          .color-picker {
            z-index: 10;
            opacity: 1;
            position: absolute;
            top: 40px;
          }
        `}</style>
      </React.Fragment>
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

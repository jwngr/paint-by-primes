import {darken} from 'polished';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {SketchPicker} from 'react-color';

import Button from './Button';

import colors from '../resources/colors.json';

class PixelatedImageEditor extends React.Component {
  state = {
    colorPickerSwatchIndex: null,
    highlightedPixelsHexValue: null,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.closeColorPicker);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeColorPicker);
  }

  highlightPixels = (hexValue) => {
    this.setState({
      highlightedPixelsHexValue: hexValue,
    });
  };

  unhighlightPixels = () => {
    this.setState({
      highlightedPixelsHexValue: null,
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
    const {colorPickerSwatchIndex, highlightedPixelsHexValue} = this.state;
    const {pixels, hexValues, goToNextStep, changeHexValue, togglePixelHexValue} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const hexValuePixelCounts = {};

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValue}, columnId) => {
        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: true,
          'cell-no-top-border': rowId === 0,
          'cell-no-left-border': columnId === 0,
          highlighted: highlightedPixelsHexValue === hexValue,
        });

        hexValuePixelCounts[hexValue] = (hexValuePixelCounts[hexValue] || 0) + 1;

        editorCells.push(
          <div
            key={`row-${rowId}-col-${columnId}`}
            className={cellClasses}
            onClick={() => togglePixelHexValue(rowId, columnId, hexValue)}
          />
        );
      });
    });

    console.log('HEX VALUES:', hexValues);

    return (
      <React.Fragment>
        <div className="pixelated-image-editor">
          <div className="swatches-wrapper">
            <p className="sub-instruction">Click on a swatch to change its color.</p>
            <div className="swatches">
              {hexValues.map((hexValue, i) => {
                const pixelCount = hexValuePixelCounts[hexValue];
                const pixelOrPixels = pixelCount === 1 ? 'pixel' : 'pixels';

                const asterisk =
                  _.filter(hexValues, (current) => hexValue === current).length === 1 ? null : (
                    <span style={{color: hexValue}}>*</span>
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
                      onMouseEnter={() => this.highlightPixels(hexValue)}
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
            <div className={`pixelated-image ${highlightedPixelsHexValue && 'has-highlight'}`}>
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
            justify-content: center;
          }

          .pixelated-image {
            display: grid;
            margin: auto;
            border: solid 6px ${colors.blue.medium};
            grid-template-rows: repeat(${numRows}, 10px);
            grid-template-columns: repeat(${numColumns}, 10px);
          }

          .cell {
            opacity: 0.5;
            border-top: solid 1px ${colors.gray.darkest}60;
            border-left: solid 1px ${colors.gray.darkest}60;
          }

          .pixelated-image.has-highlight .cell:not(.highlighted) {
            opacity: 0.2;
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
  togglePixelHexValue: PropTypes.func.isRequired,
};

export default PixelatedImageEditor;

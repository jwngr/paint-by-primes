import _ from 'lodash';
import {darken} from 'polished';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './Button';

import {hexToRgb} from '../utils';

import colors from '../resources/colors.json';

class DigitImageEditor extends React.Component {
  state = {
    isColorized: true,
  };

  changeHexValueDigit = (event, hexValue) => {
    const {hexValuesToDigits, changeHexValueDigit} = this.props;

    const newValue = Number(event.target.value.replace(hexValuesToDigits[hexValue], ''));

    if (!isNaN(newValue) && newValue >= 0 && newValue <= 9) {
      changeHexValueDigit(hexValue, newValue);
    }
  };

  toggleIsColorized = () => {
    this.setState(({isColorized}) => ({
      isColorized: !isColorized,
    }));
  };

  render() {
    const {isColorized} = this.state;
    const {pixels, hexValues, goToNextStep, hexValuesToDigits} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValue}, columnId) => {
        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: true,
        });

        editorCells.push(
          <div className={cellClasses} key={`row-${rowId}-col-${columnId}`}>
            {hexValuesToDigits[hexValue]}
          </div>
        );
      });
    });

    console.log('HEX VALUES:', hexValues);

    return (
      <React.Fragment>
        <div className="digit-image-editor">
          <div className="swatches-wrapper">
            <p className="sub-instruction">Click and type on a swatch to set its digit.</p>
            <div className="swatches">
              {hexValues.map((hexValue, i) => {
                const {r, g, b} = hexToRgb(hexValue);

                const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
                const fontColor = hsp > 170 ? colors.gray.darkest : colors.gray.lightest;

                const asterisk =
                  _.filter(
                    hexValues,
                    (current) => hexValuesToDigits[hexValue] === hexValuesToDigits[current]
                  ).length === 1 ? null : (
                    <span className="asterisk" style={{color: fontColor}}>
                      *
                    </span>
                  );

                return (
                  <div className="swatch-wrapper" key={`swatch-${i}`}>
                    <div className="swatch">
                      <input
                        type="text"
                        value={hexValuesToDigits[hexValue]}
                        style={{
                          backgroundColor: hexValue,
                          border: `solid 2px ${darken(0.2, hexValue)}`,
                          color: fontColor,
                        }}
                        onChange={(event) => this.changeHexValueDigit(event, hexValue)}
                      />
                      {asterisk}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="footnote">
              <i>* Each color must be assigned a unique digit.</i>
            </p>

            <Button onClick={goToNextStep}>Generate Prime Image</Button>
          </div>

          <div className="pixelated-image-wrapper">
            <p className="sub-instruction">
              Click on the image to {isColorized ? 'turn off' : 'turn on'} the colors.
            </p>
            <div
              className={`pixelated-image ${isColorized && 'colorized'}`}
              onClick={this.toggleIsColorized}
            >
              {editorCells}
            </div>
          </div>
        </div>

        <style jsx global>{`
          .digit-image-editor {
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
            font-size: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          ${hexValues
            .map((hexValue) => {
              return `.pixelated-image.colorized .cell-${hexValue.replace('#', '')} {
              background-color: ${hexValue};
            }`;
            })
            .join('\n')}

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
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
          }

          .swatch {
            width: 40px;
            height: 40px;
            margin: 12px;
            position: relative;
          }

          .swatch input {
            user-select: none;
            width: 100%;
            height: 100%;
            font-size: 24px;
            text-align: center;
          }

          .asterisk {
            position: absolute;
            top: 5px;
            right: 5px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

DigitImageEditor.propTypes = {
  pixels: PropTypes.array.isRequired,
  hexValues: PropTypes.array.isRequired,
  hexValuesToDigits: PropTypes.object.isRequired,
  changeHexValueDigit: PropTypes.func.isRequired,
};

export default DigitImageEditor;

import _ from 'lodash';
import {darken} from 'polished';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './Button';

import {getHsp} from '../utils';

import colors from '../resources/colors.json';

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
      pixels,
      hexValues,
      goToNextStep,
      cellDimensions,
      hexValuesToDigits,
      hexValueIndexesToDigits,
    } = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValueIndex}, columnId) => {
        const hexValue = hexValues[hexValueIndex];
        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: true,
        });

        editorCells.push(
          <div className={cellClasses} key={`row-${rowId}-col-${columnId}`}>
            {hexValueIndexesToDigits[hexValueIndex]}
          </div>
        );
      });
    });

    return (
      <React.Fragment>
        <div className="digit-image-editor">
          <div className="swatches-wrapper">
            <p className="sub-instruction">Click and type on a swatch to set its digit.</p>
            <div className="swatches">
              {_.uniq(hexValues).map((hexValue, i) => {
                const hexValueIndex = hexValues.indexOf(hexValue);

                const hsp = getHsp(hexValue);
                const fontColor = hsp > 170 ? colors.gray.darkest : colors.gray.lightest;

                const asterisk =
                  _.filter(
                    hexValuesToDigits,
                    (digit) => digit === hexValueIndexesToDigits[hexValueIndex]
                  ).length === 1 ? null : (
                    <span className="asterisk" style={{color: fontColor}}>
                      *
                    </span>
                  );

                const inputValue =
                  emptyHexValueIndex === hexValueIndex
                    ? ''
                    : hexValueIndexesToDigits[hexValueIndex];

                return (
                  <div className="swatch-wrapper" key={`swatch-${i}`}>
                    <div className="swatch">
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
            align-items: center;
          }

          .pixelated-image {
            display: grid;
            border: solid 6px ${colors.blue.medium};
            grid-template-rows: repeat(${numRows}, ${cellDimensions.height}px);
            grid-template-columns: repeat(${numColumns}, ${cellDimensions.width}px);
          }

          .cell {
            opacity: 0.5;
            font-size: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          ${_.uniq(hexValues)
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
  hexValueIndexesToDigits: PropTypes.object.isRequired,
};

export default DigitImageEditor;

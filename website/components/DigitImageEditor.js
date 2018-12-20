import _ from 'lodash';
import {darken} from 'polished';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const {pixels, hexValues, hexValuesToDigits} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValue}, columnId) => {
        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: isColorized,
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
        <div className="swatches">
          {hexValues.map((hexValue, i) => {
            return (
              <input
                type="text"
                value={hexValuesToDigits[hexValue]}
                key={`swatch-${i}`}
                className="swatch"
                style={{
                  backgroundColor: hexValue,
                  border: `solid 2px ${darken(0.2, hexValue)}`,
                }}
                onChange={(event) => this.changeHexValueDigit(event, hexValue)}
              />
            );
          })}
        </div>

        <div className="colorize-checkbox-wrapper">
          <input id="colorize-checkbox" type="checkbox" onClick={this.toggleIsColorized} />
          <label for="colorize-checkbox">Colorize Pixels</label>
        </div>

        <div className="pixelated-image-editor">{editorCells}</div>

        <style jsx global>{`
          .pixelated-image-editor {
            display: grid;
            grid-template-rows: repeat(${numRows}, 10px);
            grid-template-columns: repeat(${numColumns}, 10px);
            border: solid 3px ${colors.mediumBlue};
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
              return `.cell-${hexValue.replace('#', '')} {
              background-color: ${hexValue};
            }`;
            })
            .join('\n')}

          .swatches {
            display: flex;
            flex-direction: row;
          }

          .swatch {
            cursor: pointer;
            width: 40px;
            height: 40px;
            margin: 12px;
            user-select: none;
            position: relative;
            font-size: 24px;
            text-align: center;
          }

          .colorize-checkbox-wrapper input {
            margin-right: 8px;
            width: 20px;
            height: 20px;
          }

          .colorize-checkbox-wrapper label {
            display: inline-block;
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

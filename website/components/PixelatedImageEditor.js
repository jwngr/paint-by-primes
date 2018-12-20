import {darken} from 'polished';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {SketchPicker} from 'react-color';

import colors from '../resources/colors.json';

class PixelatedImageEditor extends React.Component {
  state = {
    colorPickerSwatchIndex: null,
  };

  changeColorPickerSwatchIndex = (newIndex) => {
    this.setState({
      colorPickerSwatchIndex: newIndex,
    });
  };

  render() {
    const {colorPickerSwatchIndex} = this.state;
    const {pixels, hexValues, changeHexValue, togglePixelHexValue} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValue}, columnId) => {
        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: true,
          'cell-no-top-border': rowId === 0,
          'cell-no-left-border': columnId === 0,
        });

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
        <div className="swatches">
          {hexValues.map((hexValue, i) => {
            return (
              <div
                key={`swatch-${i}`}
                className="swatch"
                style={{
                  backgroundColor: hexValue,
                  border: `solid 2px ${darken(0.2, hexValue)}`,
                }}
                onClick={() => this.changeColorPickerSwatchIndex(i)}
              >
                {colorPickerSwatchIndex === i && (
                  <SketchPicker
                    className="color-picker"
                    color={hexValue}
                    disableAlpha={true}
                    presetColors={_.uniq(hexValues)}
                    onChangeComplete={changeHexValue.bind(null, i)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="digit-image-editor">{editorCells}</div>

        <style jsx global>{`
          .digit-image-editor {
            display: grid;
            grid-template-rows: repeat(${numRows}, 10px);
            grid-template-columns: repeat(${numColumns}, 10px);
            border: solid 3px ${colors.mediumBlue};
          }

          .cell {
            opacity: 0.5;
            border-top: solid 1px ${colors.darkBlue};
            border-left: solid 1px ${colors.darkBlue};
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
            border: solid 2px ${colors.mediumBlue};
          }

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

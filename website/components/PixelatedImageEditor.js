import {darken} from 'polished';
import PropTypes from 'prop-types';
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
    const {pixels, uniqueHexValues, changeHexValue, togglePixelHexValue} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValue}, columnId) => {
        const cellStyles = {
          backgroundColor: hexValue,
        };

        if (rowId === 0) {
          cellStyles.borderTop = 'none';
        }

        if (columnId === 0) {
          cellStyles.borderLeft = 'none';
        }

        editorCells.push(
          <div
            className="cell"
            style={cellStyles}
            key={`row-${rowId}-col-${columnId}`}
            onClick={() => togglePixelHexValue(rowId, columnId, hexValue)}
          />
        );
      });
    });

    console.log('UNIQUE HEX VALUES:', uniqueHexValues);

    return (
      <React.Fragment>
        <div className="swatches">
          {uniqueHexValues.map((hexValue, i) => {
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
                    presetColors={_.uniq(uniqueHexValues)}
                    onChangeComplete={changeHexValue.bind(null, i)}
                  />
                )}
              </div>
            );
          })}
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
            border-top: solid 1px ${colors.darkBlue};
            border-left: solid 1px ${colors.darkBlue};
          }

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
  uniqueHexValues: PropTypes.array.isRequired,
};

export default PixelatedImageEditor;

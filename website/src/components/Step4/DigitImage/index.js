import React from 'react';
import PropTypes from 'prop-types';

import {Cell, DigitImageWrapper} from './index.styles';

class DigitImage extends React.Component {
  render() {
    const {
      hexValues,
      isColorized,
      cellDimensions,
      pixelHexValueIndexes,
      hexValueIndexesToDigits,
    } = this.props;

    const numRows = pixelHexValueIndexes.length;
    const numColumns = pixelHexValueIndexes[0].length;

    const editorCells = [];
    pixelHexValueIndexes.forEach((row, rowId) => {
      row.forEach((hexValueIndex, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        editorCells.push(
          <Cell
            hexValue={hexValue}
            isColorized={isColorized}
            key={`digit-image-editor-cell-${rowId}-${columnId}`}
          >
            {hexValueIndexesToDigits[hexValueIndex]}
          </Cell>
        );
      });
    });

    return (
      <DigitImageWrapper
        numRows={numRows}
        numColumns={numColumns}
        cellWidth={cellDimensions.width}
        cellHeight={cellDimensions.height}
      >
        {editorCells}
      </DigitImageWrapper>
    );
  }
}

DigitImage.propTypes = {
  hexValues: PropTypes.array.isRequired,
  isColorized: PropTypes.bool.isRequired,
  cellDimensions: PropTypes.object.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
  hexValueIndexesToDigits: PropTypes.array.isRequired,
};

export default DigitImage;

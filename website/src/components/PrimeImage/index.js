import React from 'react';
import PropTypes from 'prop-types';

import {PrimeImageCell, PrimeImageWrapper} from './index.styles';

class PrimeImage extends React.Component {
  render() {
    const {hexValues, cellDimensions, primeNumberString, pixelHexValueIndexes} = this.props;

    const numRows = pixelHexValueIndexes.length;
    const numColumns = pixelHexValueIndexes[0].length;

    const editorCells = [];
    pixelHexValueIndexes.forEach((row, rowId) => {
      row.forEach((hexValueIndex, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        editorCells.push(
          <PrimeImageCell
            hexValue={hexValue}
            isColorized={true}
            key={`prime-image-cell-${rowId}-${columnId}`}
          >
            {primeNumberString[rowId * numColumns + columnId]}
          </PrimeImageCell>
        );
      });
    });

    return (
      <PrimeImageWrapper
        numRows={numRows}
        numColumns={numColumns}
        cellWidth={cellDimensions.width}
        cellHeight={cellDimensions.height}
      >
        {editorCells}
      </PrimeImageWrapper>
    );
  }
}

PrimeImage.propTypes = {
  hexValues: PropTypes.array.isRequired,
  cellDimensions: PropTypes.object.isRequired,
  primeNumberString: PropTypes.string.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
};

export default PrimeImage;

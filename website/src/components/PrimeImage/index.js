import React from 'react';
import PropTypes from 'prop-types';

import {PrimeImageCell, PrimeImageWrapper} from './index.styles';

class PrimeImage extends React.Component {
  render() {
    const {pixels, hexValues, cellDimensions, primeNumberString} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.forEach((row, rowId) => {
      row.forEach(({hexValueIndex}, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        editorCells.push(
          <PrimeImageCell hexValue={hexValue} key={`prime-image-cell-${rowId}-${columnId}`}>
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
  pixels: PropTypes.array.isRequired,
  hexValues: PropTypes.array.isRequired,
  cellDimensions: PropTypes.object.isRequired,
  primeNumberString: PropTypes.string.isRequired,
};

export default PrimeImage;

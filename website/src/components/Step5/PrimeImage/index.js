import React from 'react';
import PropTypes from 'prop-types';

import {PrimeImageCell, PrimeImageWrapper} from './index.styles';

class PrimeImage extends React.PureComponent {
  render() {
    const {
      opacity,
      fontSize,
      hexValues,
      hasBorders,
      isColorized,
      cellDimensions,
      setPrimeImageRef,
      primeNumberString,
      pixelHexValueIndexes,
    } = this.props;

    const numRows = pixelHexValueIndexes.length;
    const numColumns = pixelHexValueIndexes[0].length;

    const editorCells = [];
    pixelHexValueIndexes.forEach((row, rowId) => {
      row.forEach((hexValueIndex, columnId) => {
        const hexValue = hexValues[hexValueIndex];

        editorCells.push(
          <PrimeImageCell
            opacity={opacity}
            hexValue={hexValue}
            fontSize={fontSize}
            isColorized={isColorized}
            key={`prime-image-cell-${rowId}-${columnId}`}
          >
            {primeNumberString[rowId * numColumns + columnId]}
          </PrimeImageCell>
        );
      });
    });

    return (
      <PrimeImageWrapper
        ref={setPrimeImageRef}
        numRows={numRows}
        numColumns={numColumns}
        hasBorders={hasBorders}
        cellWidth={cellDimensions.width}
        cellHeight={cellDimensions.height}
      >
        {editorCells}
      </PrimeImageWrapper>
    );
  }
}

PrimeImage.propTypes = {
  opacity: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  hexValues: PropTypes.array.isRequired,
  hasBorders: PropTypes.bool.isRequired,
  isColorized: PropTypes.bool.isRequired,
  cellDimensions: PropTypes.object.isRequired,
  primeNumberString: PropTypes.string.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
};

export default PrimeImage;

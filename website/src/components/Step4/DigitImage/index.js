import React from 'react';
import PropTypes from 'prop-types';

import {Cell, DigitImageWrapper} from './index.styles';

import {getScaledImageDimensions} from '../../../lib/utils';
import withMaxImageDimensions from '../../../lib/withMaxImageDimensions';

class DigitImage extends React.PureComponent {
  render() {
    const {
      hexValues,
      isColorized,
      sourceImage,
      pixelDimensions,
      maxImageDimensions,
      pixelHexValueIndexes,
      hexValueIndexesToDigits,
    } = this.props;

    const {scaledPixelDimensions} = getScaledImageDimensions({
      sourceImage,
      pixelDimensions,
      maxImageDimensions,
    });

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
        cellWidth={scaledPixelDimensions.width}
        cellHeight={scaledPixelDimensions.height}
      >
        {editorCells}
      </DigitImageWrapper>
    );
  }
}

DigitImage.propTypes = {
  hexValues: PropTypes.array.isRequired,
  isColorized: PropTypes.bool.isRequired,
  sourceImage: PropTypes.object.isRequired,
  pixelDimensions: PropTypes.object.isRequired,
  maxImageDimensions: PropTypes.object.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
  hexValueIndexesToDigits: PropTypes.array.isRequired,
};

export default withMaxImageDimensions(DigitImage);

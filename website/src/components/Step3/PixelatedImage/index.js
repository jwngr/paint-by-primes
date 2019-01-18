import React from 'react';
import PropTypes from 'prop-types';

import {Cell, CellWrapper, PixelatedImageWrapper} from './index.styles';

import {getScaledImageDimensions} from '../../../lib/utils';
import withMaxImageDimensions from '../../../lib/withMaxImageDimensions';

class PixelatedImage extends React.PureComponent {
  render() {
    const {
      hexValues,
      sourceImage,
      pixelDimensions,
      maxImageDimensions,
      selectedSwatchIndex,
      pixelHexValueIndexes,
      highlightedPixelsHexValueIndex,
      setPixelToSelectedSwatchHexValue,
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
          <CellWrapper key={`pixelated-image-editor-cell-${rowId}-${columnId}`}>
            <Cell
              hexValue={hexValue}
              hoverHexValue={hexValues[selectedSwatchIndex]}
              hasReducedOpacity={
                highlightedPixelsHexValueIndex !== null &&
                highlightedPixelsHexValueIndex !== hexValueIndex
              }
              onClick={() => setPixelToSelectedSwatchHexValue(rowId, columnId)}
            />
          </CellWrapper>
        );
      });
    });

    return (
      <PixelatedImageWrapper
        numRows={numRows}
        numColumns={numColumns}
        cellWidth={scaledPixelDimensions.width}
        cellHeight={scaledPixelDimensions.height}
      >
        {editorCells}
      </PixelatedImageWrapper>
    );
  }
}

PixelatedImage.propTypes = {
  hexValues: PropTypes.array.isRequired,
  sourceImage: PropTypes.object.isRequired,
  pixelDimensions: PropTypes.object.isRequired,
  maxImageDimensions: PropTypes.object.isRequired,
  selectedSwatchIndex: PropTypes.string.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
  highlightedPixelsHexValueIndex: PropTypes.number,
  setPixelToSelectedSwatchHexValue: PropTypes.func.isRequired,
};

export default withMaxImageDimensions(PixelatedImage);

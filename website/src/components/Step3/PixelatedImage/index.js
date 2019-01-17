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
      changePixelHexValue,
      pixelHexValueIndexes,
      selectedImageEditorHexValue,
      highlightedPixelsHexValueIndex,
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
              hoverHexValue={selectedImageEditorHexValue}
              hasReducedOpacity={
                highlightedPixelsHexValueIndex !== null &&
                highlightedPixelsHexValueIndex !== hexValueIndex
              }
              onClick={() => changePixelHexValue(rowId, columnId, selectedImageEditorHexValue)}
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
  changePixelHexValue: PropTypes.func.isRequired,
  pixelHexValueIndexes: PropTypes.array.isRequired,
  selectedImageEditorHexValue: PropTypes.string.isRequired,
  highlightedPixelsHexValueIndex: PropTypes.number,
};

export default withMaxImageDimensions(PixelatedImage);

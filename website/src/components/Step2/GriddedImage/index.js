import React from 'react';
import PropTypes from 'prop-types';

import {VerticalLine, HorizontalLine, GriddedImageWrapper} from './index.styles';

class GriddedImage extends React.PureComponent {
  render() {
    const {src, imageWidth, pixelWidth, imageHeight, pixelHeight, scaleFactor} = this.props;

    const scaledPixelWidth = pixelWidth * scaleFactor;
    const scaledPixelHeight = pixelHeight * scaleFactor;

    let pixelLines = [];
    for (let i = 1; i < imageWidth / scaledPixelWidth; i++) {
      pixelLines.push(
        <HorizontalLine
          left={i * scaledPixelWidth}
          height={imageHeight}
          key={`horizontal-line-${i}`}
        >
          &nbsp;
        </HorizontalLine>
      );
    }

    for (let i = 1; i < imageHeight / scaledPixelHeight; i++) {
      pixelLines.push(
        <VerticalLine top={i * scaledPixelHeight} width={imageWidth} key={`vertical-line-${i}`}>
          &nbsp;
        </VerticalLine>
      );
    }

    return (
      <GriddedImageWrapper width={imageWidth} height={imageHeight}>
        <img src={src} alt="Source with overlaid grid showing size of individual pixels." />
        {pixelLines}
      </GriddedImageWrapper>
    );
  }
}

GriddedImage.propTypes = {
  src: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  pixelWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  pixelHeight: PropTypes.number.isRequired,
  scaleFactor: PropTypes.number.isRequired,
};

export default GriddedImage;

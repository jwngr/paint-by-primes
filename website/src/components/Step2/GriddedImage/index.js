import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {VerticalLine, HorizontalLine, GriddedImageWrapper} from './index.styles';

import {SIDEBAR_WIDTH_PX} from '../../../resources/constants';

class GriddedImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.debouncedResize = _.debounce(this.resize.bind(this), 350);

    window.addEventListener('resize', this.debouncedResize);

    this.state = {
      maxImageWidth: this.getMaxImageWidth(),
      maxImageHeight: this.getMaxImageHeight(),
    };
  }

  resize() {
    this.setState({
      maxImageWidth: this.getMaxImageWidth(),
      maxImageHeight: this.getMaxImageHeight(),
    });
  }

  getMaxImageWidth = () => {
    const windowWidth = window.innerWidth;
    const paddingWidth = 2 * 12;
    const borderWidth = 2 * 6;

    if (windowWidth > 768) {
      return windowWidth - paddingWidth - borderWidth - SIDEBAR_WIDTH_PX;
    } else {
      return windowWidth - paddingWidth - borderWidth;
    }
  };

  getMaxImageHeight = () => {
    const windowHeight = window.innerHeight;
    const paddingHeight = 2 * 12;
    const borderHeight = 2 * 6;

    return windowHeight - paddingHeight - borderHeight;
  };

  render() {
    const {maxImageWidth, maxImageHeight} = this.state;
    let {src, imageWidth, pixelWidth, imageHeight, pixelHeight, scaleFactor} = this.props;

    // Scale the image so it is no wider than the screen.
    const imageWidthScaleFactor = imageWidth > maxImageWidth ? maxImageWidth / imageWidth : 1;
    imageWidth = imageWidth * imageWidthScaleFactor;
    imageHeight = imageHeight * imageWidthScaleFactor;

    // Scale the image so it is no higher than the screen.
    const imageHeightScaleFactor = imageHeight > maxImageHeight ? maxImageHeight / imageHeight : 1;
    imageWidth = imageWidth * imageHeightScaleFactor;
    imageHeight = imageHeight * imageHeightScaleFactor;

    // Scale the pixel dimensions.
    const scaledPixelWidth =
      pixelWidth * scaleFactor * imageWidthScaleFactor * imageHeightScaleFactor;
    const scaledPixelHeight =
      pixelHeight * scaleFactor * imageWidthScaleFactor * imageHeightScaleFactor;

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

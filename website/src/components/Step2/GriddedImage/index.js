import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {VerticalLine, HorizontalLine, GriddedImageWrapper} from './index.styles';

import {getScaledImageDimensions} from '../../../lib/utils';
import withMaxImageDimensions from '../../../lib/withMaxImageDimensions';

class GriddedImage extends React.PureComponent {
  render() {
    const {sourceImage, pixelDimensions, maxImageDimensions} = this.props;

    const {scaledImageDimensions, scaledPixelDimensions} = getScaledImageDimensions({
      sourceImage,
      pixelDimensions,
      maxImageDimensions,
    });

    let pixelLines = [];
    for (let i = 1; i < scaledImageDimensions.width / scaledPixelDimensions.width; i++) {
      pixelLines.push(
        <HorizontalLine
          left={i * scaledPixelDimensions.width}
          height={scaledImageDimensions.height}
          key={`horizontal-line-${i}`}
        >
          &nbsp;
        </HorizontalLine>
      );
    }

    for (let i = 1; i < scaledImageDimensions.height / scaledPixelDimensions.height; i++) {
      pixelLines.push(
        <VerticalLine
          top={i * scaledPixelDimensions.height}
          width={scaledImageDimensions.width}
          key={`vertical-line-${i}`}
        >
          &nbsp;
        </VerticalLine>
      );
    }

    return (
      <GriddedImageWrapper
        width={scaledImageDimensions.width}
        height={scaledImageDimensions.height}
      >
        <img
          src={sourceImage.fileUrl}
          alt="Source with overlaid grid showing size of individual pixels."
        />
        {pixelLines}
      </GriddedImageWrapper>
    );
  }
}

GriddedImage.propTypes = {
  sourceImage: PropTypes.object.isRequired,
  pixelDimensions: PropTypes.object.isRequired,
  maxImageDimensions: PropTypes.object.isRequired,
};

export default withMaxImageDimensions(GriddedImage);

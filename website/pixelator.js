import _ from 'lodash';
import getPixels from 'get-pixels';

import {rgbToHex, compareDistance} from './utils.js';

const INITIAL_COLOR_MATCH_DISTANCE = 10;

const pixelate = (file, pixelDimensions) => {
  let errorMessage;
  if (typeof file !== 'string') {
    errorMessage = 'Source file must be provided.';
  } else if (!Number.isInteger(pixelDimensions.width) || pixelDimensions.width < 1) {
    errorMessage = 'Pixel width must be a positive integer.';
  } else if (!Number.isInteger(pixelDimensions.height) || pixelDimensions.height < 1) {
    errorMessage = 'Pixel height must be a positive integer.';
  }

  if (typeof errorMessage !== 'undefined') {
    return Promise.reject(new Error(errorMessage));
  }

  return new Promise((resolve, reject) => {
    getPixels(file, (error, pixels) => {
      if (error) {
        return reject(error);
      }

      // Get the dimensions of the source image.
      const [sourceImageWidth, sourceImageHeight] = pixels.shape;

      // Get the dimensions of the target image.
      const targetImageWidth = Math.ceil(sourceImageWidth / pixelDimensions.width);
      const targetImageHeight = Math.ceil(sourceImageHeight / pixelDimensions.height);

      // Create a 2D array to store each pixel's hex value.
      const rawPixelBlocks = _.range(0, targetImageHeight).map(() => []);

      // Loop through each pixel in the desination image.
      for (let yCoord = 0; yCoord < targetImageHeight; ++yCoord) {
        for (let xCoord = 0; xCoord < targetImageWidth; ++xCoord) {
          // We may be reducing a block of pixels into a single pixel if the pixel width or height
          // is greater than 1, so loop through each pixel in the current block and calculate their
          // average RGB components.
          let pixelCount = 0;
          let totalR = 0;
          let totalG = 0;
          let totalB = 0;

          for (var offsetX = 0; offsetX < pixelDimensions.width; offsetX++) {
            for (var offsetY = 0; offsetY < pixelDimensions.height; offsetY++) {
              const mappedXCoord = xCoord * pixelDimensions.width + offsetX;
              const mappedYCoord = yCoord * pixelDimensions.height + offsetY;

              const currentR = pixels.get(mappedXCoord, mappedYCoord, 0);
              const currentG = pixels.get(mappedXCoord, mappedYCoord, 1);
              const currentB = pixels.get(mappedXCoord, mappedYCoord, 2);

              if (
                typeof currentR !== 'undefined' &&
                typeof currentG !== 'undefined' &&
                typeof currentB !== 'undefined'
              ) {
                totalR += currentR;
                totalG += currentG;
                totalB += currentB;
                pixelCount++;
              }
            }
          }

          // Convert the average RGB components into a hex value and store it in the pixel hex
          // values 2D array.
          const averageR = Math.round(totalR / pixelCount);
          const averageG = Math.round(totalG / pixelCount);
          const averageB = Math.round(totalB / pixelCount);

          rawPixelBlocks[yCoord][xCoord] = {
            red: averageR,
            green: averageG,
            blue: averageB,
            hex: rgbToHex(averageR, averageG, averageB),
          };
        }
      }

      // We only have 10 unique digits to work with in our final image. So, we need to create
      // another 2D array of the same size to store each pixel's hex value, but consolidate the
      // colors to at most 10 unique hex values.
      const finalPixelBlocks = _.range(0, rawPixelBlocks.length).map(() => []);

      // Loop through each existing raw pixel block and, if it is within a certain distance of
      // another pixel block already seen, change its color. Until the resulting 2D contains at most
      // 10 unique hex values, keep increasing the color distance.
      let uniqueBlocks = [];
      let requiredColorMatchDistance = INITIAL_COLOR_MATCH_DISTANCE;
      while (uniqueBlocks.length === 0 || uniqueBlocks.length > 10) {
        uniqueBlocks = [];

        for (let i = 0; i < targetImageHeight; i++) {
          for (let j = 0; j < targetImageWidth; j++) {
            let currentPixelBlock = rawPixelBlocks[i][j];

            let minExistingColorMatchDistance = requiredColorMatchDistance;

            uniqueBlocks.forEach((blockToCompare) => {
              const distance = compareDistance(currentPixelBlock, blockToCompare);

              if (distance < minExistingColorMatchDistance) {
                currentPixelBlock = blockToCompare;
                minExistingColorMatchDistance = distance;
              }
            });

            finalPixelBlocks[i][j] = currentPixelBlock;

            if (!_.includes(uniqueBlocks, currentPixelBlock)) {
              uniqueBlocks.push(currentPixelBlock);
            }
          }
        }

        requiredColorMatchDistance += 5;
      }

      const hexValues = uniqueBlocks.map(({hex}) => hex);

      const finalPixels = _.range(0, finalPixelBlocks.length).map(() => []);

      finalPixelBlocks.forEach((row, i) => {
        row.forEach(({hex: hexValue}, j) => {
          finalPixels[i][j] = {
            hexValue: hexValue,
            colorIndex: hexValues.indexOf(hexValue),
          };
        });
      });

      return resolve({
        hexValues,
        pixels: finalPixels,
      });
    });
  });
};

export {pixelate};

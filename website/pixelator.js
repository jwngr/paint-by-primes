import _ from 'lodash';
import getPixels from 'get-pixels';
import {rgbToHex, compareDistance} from './utils.js';

const INITIAL_COLOR_MATCH_DISTANCE = 20;

const pixelate = (file, pixelDimensions) => {
  let errorMessage;
  if (typeof file !== 'string') {
    errorMessage = 'Source file must be provided.';
  } else if (typeof pixelDimensions.width !== 'number' || pixelDimensions.width < 1) {
    errorMessage = 'Pixel width must be a positive integer.';
  } else if (typeof pixelDimensions.height !== 'number' || pixelDimensions.height < 1) {
    errorMessage = 'Pixel height must be a positive integer.';
  }

  if (typeof errorMessage !== 'undefined') {
    return Promise.resolve(new Error(errorMessage));
  }

  return new Promise((resolve, reject) => {
    getPixels(file, (error, pixels) => {
      if (error) {
        return reject(error);
      }

      // Get the dimensions of the source image.
      const nx = pixels.shape[0];
      const ny = pixels.shape[1];

      // Create a 2D array to store each pixel's hex value.
      const rawPixelBlocks = _.range(0, ny / pixelDimensions.height).map(() => []);

      // Loop through each pixel in the desination image.
      for (let i = 0; i < nx / pixelDimensions.width; ++i) {
        for (let j = 0; j < ny / pixelDimensions.height; ++j) {
          // We may be reducing a block of pixels into a single pixel if the pixel width or height
          // is greater than 1, so loop through each pixel in the current block and calculate their
          // average RGB components.
          let pixelCount = 0;
          let totalR = 0;
          let totalG = 0;
          let totalB = 0;

          for (var offsetX = 0; offsetX < pixelDimensions.width; offsetX++) {
            for (var offsetY = 0; offsetY < pixelDimensions.height; offsetY++) {
              const currentR = pixels.get(
                i * pixelDimensions.width + offsetX,
                j * pixelDimensions.height + offsetY,
                0
              );
              const currentG = pixels.get(
                i * pixelDimensions.width + offsetX,
                j * pixelDimensions.height + offsetY,
                1
              );
              const currentB = pixels.get(
                i * pixelDimensions.width + offsetX,
                j * pixelDimensions.height + offsetY,
                2
              );

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

          rawPixelBlocks[i][j] = {
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
      const numRows = rawPixelBlocks.length;
      const numColumns = rawPixelBlocks[0].length;

      const finalPixelBlocks = _.range(0, numRows).map(() => []);

      // Loop through each existing raw pixel block and, if it is within a certain distance of
      // another pixel block already seen, change its color. Until the resulting 2D contains at most
      // 10 unique hex values, keep increasing the color distance.
      let uniqueBlocks = [];
      let requiredColorMatchDistance = INITIAL_COLOR_MATCH_DISTANCE;
      while (uniqueBlocks.length === 0 || uniqueBlocks.length > 10) {
        console.log('TRYING WITH REQUIRED COLOR MATCH DISTANCE OF', requiredColorMatchDistance);
        uniqueBlocks = [];

        for (let i = 0; i < numColumns; i++) {
          for (let j = 0; j < numRows; j++) {
            let currentPixelBlock = rawPixelBlocks[i][j];

            let minExistingColorMatchDistance = requiredColorMatchDistance;

            uniqueBlocks.forEach((blockToCompare) => {
              // const distance = colorDistance.compare(currentPixelBlock.hex, blockToCompare.hex);
              // TODO: implement custom method which is faster.
              const distance = compareDistance(currentPixelBlock, blockToCompare);
              // if (distance !== distance2) {
              //   console.log('BAD', distance, distance2, currentPixelBlock, blockToCompare);
              // }

              if (distance < minExistingColorMatchDistance) {
                currentPixelBlock = blockToCompare;
                minExistingColorMatchDistance = distance;
              }
            });

            finalPixelBlocks[j][i] = currentPixelBlock;

            if (!_.includes(uniqueBlocks, currentPixelBlock)) {
              uniqueBlocks.push(currentPixelBlock);
            }
          }
        }
        console.log('NUM COLORS:', uniqueBlocks.length);

        requiredColorMatchDistance += 5;
      }

      const uniqueHexValues = uniqueBlocks.map(({hex}) => hex);

      const finalPixels = _.range(0, numRows).map(() => []);
      for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
          finalPixels[i][j] = {
            hexValue: finalPixelBlocks[i][j].hex,
            colorIndex: uniqueHexValues.indexOf(finalPixelBlocks[i][j].hex),
          };
        }
      }

      return resolve({
        uniqueHexValues,
        pixels: finalPixels,
      });
    });
  });
};

export {pixelate};

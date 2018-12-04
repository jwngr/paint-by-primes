var getPixels = require('get-pixels');
var colorDistance = require('color-difference');

const uniqueColors = new Set();
const colors = {};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const PIXEL_SIZE = process.argv[3] || 4;

getPixels(process.argv[2], (err, pixels) => {
  if (err) {
    console.log('Bad image path');
    return;
  }

  var nx = pixels.shape[0];
  var ny = pixels.shape[1];

  console.log('DIMENSIONS:', nx, ny);

  const rows = [];
  for (var i = 0; i < nx / PIXEL_SIZE; ++i) {
    rows.push([]);
  }

  for (var i = 0; i < nx / PIXEL_SIZE; ++i) {
    for (var j = 0; j < ny / PIXEL_SIZE; ++j) {
      let count = 0;
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;

      for (var offsetX = 0; offsetX < PIXEL_SIZE; offsetX++) {
        for (var offsetY = 0; offsetY < PIXEL_SIZE; offsetY++) {
          const R = pixels.get(i * PIXEL_SIZE + offsetX, j * PIXEL_SIZE + offsetY, 0);
          const G = pixels.get(i * PIXEL_SIZE + offsetX, j * PIXEL_SIZE + offsetY, 1);
          const B = pixels.get(i * PIXEL_SIZE + offsetX, j * PIXEL_SIZE + offsetY, 2);

          if (typeof R !== 'undefined' && typeof G !== 'undefined' && typeof B !== 'undefined') {
            totalR += R;
            totalG += G;
            totalB += B;

            count++;
          }
        }
      }

      const colorString = rgbToHex(
        Math.round(totalR / count),
        Math.round(totalG / count),
        Math.round(totalB / count)
      );

      let matchDistance = 30;
      let matchColorString = colorString;
      Object.keys(colors).forEach((color) => {
        const distance = colorDistance.compare(color, colorString);
        if (distance < matchDistance) {
          // console.log(distance, color, colorString);
          matchColorString = color;
          matchDistance = distance;
        }
      });

      if (!(matchColorString in colors)) {
        colors[matchColorString] = Object.keys(colors).length;
      }

      rows[j].push(colors[matchColorString]);
    }
  }

  const numColors = Object.keys(colors).length;

  console.log('NUM COLORS:', numColors);

  if (numColors > 10) {
    console.log('Too many colors!');
  } else {
    rows.forEach((row) => {
      console.log(row.join(''));
    });
  }
});

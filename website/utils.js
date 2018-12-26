const _componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return '#' + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
};

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const compareDistance = (color1, color2) => {
  if (color1.hex === color2.hex) {
    return 0;
  }

  let sum = 0;

  sum += Math.pow(color1.red - color2.red, 2);
  sum += Math.pow(color1.green - color2.green, 2);
  sum += Math.pow(color1.blue - color2.blue, 2);

  const conversionIndex = 19.5075;

  return Math.sqrt(sum / conversionIndex);
};

const getNumberWithCommas = (val) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export {rgbToHex, hexToRgb, compareDistance, getNumberWithCommas};

import {colors} from '../resources/theme.json';
import {
  PRIME_IMAGE_MAX_DIGIT_COUNT,
  PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT,
} from '../resources/constants';

const _componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
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

const getHsp = (hexValue) => {
  const {r, g, b} = hexToRgb(hexValue);
  return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
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

const getDigitsCountColor = (digitsCount) => {
  if (digitsCount > PRIME_IMAGE_MAX_DIGIT_COUNT) {
    return colors.red.darker;
  } else if (digitsCount > PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT) {
    return colors.orange.darker;
  } else {
    return colors.green.darker;
  }
};

const getPaddedNumber = (val) => {
  return val > 9 ? val : `0${val}`;
};

const getFormattedTimeFromSeconds = (secondsCount) => {
  const hours = getPaddedNumber(Math.floor(secondsCount / (60 * 60)));
  const minutes = getPaddedNumber(Math.floor((secondsCount / 60) % 60));
  const seconds = getPaddedNumber(secondsCount % 60);

  if (Number(hours) === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
};

const copyToClipboard = (textToCopy) => {
  // Create a text area element and set its value to the text to be copied.
  const el = document.createElement('textarea');
  el.value = textToCopy;

  // Make the textarea read-only.
  el.setAttribute('readonly', '');

  // Move the textarea outside the screen to make it invisible.
  el.style.position = 'absolute';
  el.style.left = '-9999px';

  // Append the textarea element to the HTML document.
  document.body.appendChild(el);

  // Store the current text selection, if any.
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

  // Copy the text from the newly created textarea element.
  el.select();
  document.execCommand('copy');

  // Remove the textarea element.
  document.body.removeChild(el);

  // If a selection existed before copying, restore the original selection.
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

export {
  getHsp,
  rgbToHex,
  hexToRgb,
  compareDistance,
  copyToClipboard,
  getPaddedNumber,
  getNumberWithCommas,
  getDigitsCountColor,
  getFormattedTimeFromSeconds,
};

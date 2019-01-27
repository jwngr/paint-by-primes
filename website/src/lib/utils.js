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
  let textarea;
  let result;

  try {
    // Create a text area element and set its value to the text to be copied.
    textarea = document.createElement('textarea');

    // Make the textarea read only and content editable.
    textarea.setAttribute('readonly', true);
    textarea.setAttribute('contenteditable', true);

    // Prevent scroll from jumping to the bottom when focus is set on the textarea.
    textarea.style.position = 'fixed';

    // Set the textarea's value to the text to be copied.
    textarea.value = textToCopy;

    // Append the textarea element to the HTML document.
    document.body.appendChild(textarea);

    // Set the focus to the textarea.
    textarea.select();

    // Creatre a selection around the textarea.
    const range = document.createRange();
    range.selectNodeContents(textarea);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // Copy the text from the newly created textarea element.
    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand('copy');

    // TODO: restore pre-existing selection.
  } catch (error) {
    // eslint-disable-next-line
    console.error('Failed to copy text to clipboard:', error);
    result = null;
  } finally {
    // Remove the textarea element.
    document.body.removeChild(textarea);
  }

  // manual copy fallback using prompt
  if (!result) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
    result = prompt(`Press ${copyHotkey}`, textToCopy); // eslint-disable-line no-alert
    if (!result) {
      return false;
    }
  }

  return true;
};

const getScaledImageDimensions = ({sourceImage, pixelDimensions, maxImageDimensions}) => {
  let resizeScaleFactor = 1;
  let imageWidth = sourceImage.width;
  let imageHeight = sourceImage.height;

  let i = 1;
  while (imageWidth < 400) {
    resizeScaleFactor = (resizeScaleFactor / i) * (i + 1);
    imageWidth = sourceImage.width * resizeScaleFactor;
    imageHeight = sourceImage.height * resizeScaleFactor;
    i++;
  }

  i = 1;
  while (imageWidth > 800) {
    resizeScaleFactor = (resizeScaleFactor * i) / (i + 1);
    imageWidth = sourceImage.width * resizeScaleFactor;
    imageHeight = sourceImage.height * resizeScaleFactor;
    i++;
  }

  // Scale the image so it is no wider than the screen.
  const imageWidthScaleFactor =
    imageWidth > maxImageDimensions.width ? maxImageDimensions.width / imageWidth : 1;

  // Scale the image so it is no higher than the screen.
  const scaledImageHeight = imageHeight * imageWidthScaleFactor;
  const imageHeightScaleFactor =
    scaledImageHeight > maxImageDimensions.height
      ? maxImageDimensions.height / scaledImageHeight
      : 1;

  const maxImageDimensionsScaleFactor = imageWidthScaleFactor * imageHeightScaleFactor;

  // Scale the image and its pixel dimensions so it fits nicely within the screen.
  return {
    scaledImageDimensions: {
      width: imageWidth * maxImageDimensionsScaleFactor,
      height: imageHeight * maxImageDimensionsScaleFactor,
    },
    scaledPixelDimensions: {
      width: pixelDimensions.width * resizeScaleFactor * maxImageDimensionsScaleFactor,
      height: pixelDimensions.height * resizeScaleFactor * maxImageDimensionsScaleFactor,
    },
  };
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
  getScaledImageDimensions,
};

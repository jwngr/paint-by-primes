import _ from 'lodash';
import {darken} from 'polished';

import Button from '../Button';
import StepInstructions from '../StepInstructions';

import {pixelate} from '../../pixelator.js';
import colors from '../../resources/colors.json';

const PIXEL_DIGITS_ORDERING = [1, 0, 7, 8, 2, 3, 4, 5, 6, 9];

export default class Step3 extends React.Component {
  state = {
    pixels: null,
    nextDigitIndex: 0,
    hexValuesToDigits: null,
    digitsToHexValues: null, // TODO: remove need for this.
    isColored: true,
    errorMessage: null,
  };

  componentDidMount() {
    const {file, pixelWidth, pixelHeight} = this.props;

    let nextDigitIndex = 0;

    return pixelate({file, pixelHeight, pixelWidth})
      .then(({pixelHexValues: pixels}) => {
        const numRows = pixels.length;
        const numColumns = pixels[0].length;

        console.log('PIXELS HEX VALUES:', pixels, numRows, numColumns);

        const hexValuesToDigits = {};
        const digitsToHexValues = {};

        for (let i = 0; i < numColumns; i++) {
          for (let j = 0; j < numRows; j++) {
            let currentPixelHexValue = pixels[i][j];

            let digit;
            if (currentPixelHexValue in hexValuesToDigits) {
              digit = hexValuesToDigits[currentPixelHexValue];
            } else {
              digit = PIXEL_DIGITS_ORDERING[_.size(hexValuesToDigits)];
              hexValuesToDigits[currentPixelHexValue] = digit;
              digitsToHexValues[digit] = currentPixelHexValue;
              nextDigitIndex++;
            }
          }
        }

        this.setState({
          pixels,
          nextDigitIndex,
          hexValuesToDigits,
          digitsToHexValues,
          errorMessage: null,
        });
      })
      .catch((error) => {
        this.setState({errorMessage: `Failed to pixelate image: ${error.message}`});
      });
  }

  updateDigitForHexValue = (hexValue, oldDigit) => {
    const {nextDigitIndex, digitsToHexValues, hexValuesToDigits} = this.state;

    if (_.size(digitsToHexValues) === 10) {
      // TODO: Figure out how to change digits when there are 10 digits.
      return;
    }

    const updatedDigitsToHexValues = _.clone(digitsToHexValues);
    const updatedHexValuesToDigits = _.clone(hexValuesToDigits);

    let updatedNextDigitIndex = nextDigitIndex;
    while (
      typeof digitsToHexValues[PIXEL_DIGITS_ORDERING[updatedNextDigitIndex % 10]] !== 'undefined'
    ) {
      updatedNextDigitIndex++;
    }

    const newDigit = PIXEL_DIGITS_ORDERING[updatedNextDigitIndex % 10];

    delete updatedDigitsToHexValues[oldDigit];

    updatedDigitsToHexValues[newDigit] = hexValue;
    updatedHexValuesToDigits[hexValue] = newDigit;

    this.setState({
      nextDigitIndex: updatedNextDigitIndex + 1,
      digitsToHexValues: updatedDigitsToHexValues,
      hexValuesToDigits: updatedHexValuesToDigits,
    });
  };

  toggleColors = () => {
    this.setState({
      isColored: !this.state.isColored,
    });
  };

  render() {
    const {isColored, pixels, errorMessage, digitsToHexValues, hexValuesToDigits} = this.state;
    const {file, width, height, pixelWidth, pixelHeight, goToNextStep} = this.props;

    let mainContent;
    if (pixels === null) {
      mainContent = <p>Analyzing image colors... {errorMessage}</p>;
    } else {
      const numberImageContent = (
        <div className="image-container">
          {pixels.map((row, rowId) => {
            return (
              <p className="row" key={`row-${rowId}`}>
                {row.map((hexValue, columnId) => {
                  const cellStyles = {};
                  if (isColored) {
                    cellStyles.backgroundColor = hexValue;
                    cellStyles.opacity = 0.5;
                  }
                  return (
                    <span className="digit" style={cellStyles} key={`row-${rowId}-col-${columnId}`}>
                      {hexValuesToDigits[hexValue]}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      );

      mainContent = (
        <div className="content-wrapper">
          <div className="left-content-wrapper">
            <div className="colors-wrapper">
              {_.map(hexValuesToDigits, (digit, hexValue) => {
                return (
                  <div
                    onClick={() => this.updateDigitForHexValue(hexValue, digit)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: hexValue,
                      cursor: 'pointer',
                      width: '40px',
                      height: '40px',
                      border: `solid 2px ${darken(0.2, hexValue)}`,
                      margin: '12px',
                    }}
                  >
                    <p>{digit}</p>
                  </div>
                );
              })}
            </div>

            <Button onClick={this.toggleColors}>TOGGLE COLORS</Button>

            <Button
              text
              onClick={() =>
                goToNextStep({
                  file,
                  width,
                  height,
                  pixels,
                  pixelWidth,
                  pixelHeight,
                  hexValuesToDigits,
                  digitsToHexValues,
                })
              }
            >
              CONTINUE
            </Button>
          </div>

          {numberImageContent}
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="step3">
          <StepInstructions>
            <p>Assign a unique digit for each color in your image.</p>
          </StepInstructions>

          {mainContent}
        </div>
        <style jsx global>{`
          .step3 {
            text-align: center;
            border: solid 1px blue;
          }

          .content-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
            border: solid 1px red;
          }

          .left-content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            border: solid 1px blue;
          }

          .colors-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }

          .row {
            display: flex;
            flex-direction: row;
            margin: 0;
          }

          .digit {
            margin: 0;
            width: 10px;
            height: 10px;
            font-size: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Roboto Mono', monospace;
          }

          .image-container {
            position: relative;
            border: solid 3px purple;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

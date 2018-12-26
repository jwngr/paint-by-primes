import _ from 'lodash';

import DigitImageEditor from '../DigitImageEditor';
import StepInstructions from '../StepInstructions';

import {withStore} from '../../Store';

const DIGIT_ORDERING = [1, 8, 7, 0, 2, 6, 3, 9, 4, 5];

class Step4 extends React.Component {
  constructor(props) {
    super(props);

    const {pixelatedImage, imageNumberString, latestValidStep} = props;

    let hexValuesToDigits = {};
    let hexValueIndexesToDigits = [];
    if (typeof imageNumberString !== 'undefined' && latestValidStep > 4) {
      hexValuesToDigits = props.hexValuesToDigits;
      hexValueIndexesToDigits = props.hexValueIndexesToDigits;
    } else {
      console.log('hi');
      pixelatedImage.hexValues.forEach((hexValue, i) => {
        const digit =
          hexValue in hexValuesToDigits
            ? hexValuesToDigits[hexValue]
            : DIGIT_ORDERING[_.size(hexValuesToDigits)];

        hexValueIndexesToDigits[i] = digit;
        hexValuesToDigits[hexValue] = digit;
      });
    }

    this.state = {
      errorMessage: null,
      isColorized: true,
      hexValuesToDigits,
      hexValueIndexesToDigits,
    };
  }

  changeHexValueDigit = (hexValue, newDigit) => {
    // TODO: handle first digit starting with 0.
    const {pixelatedImage} = this.props;
    const {hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    const updatedHexValuesToDigits = {
      ...hexValuesToDigits,
      [hexValue]: newDigit,
    };

    const updatedHexValueIndexesToDigits = hexValueIndexesToDigits.map((digit, i) => {
      return pixelatedImage.hexValues[i] === hexValue ? newDigit : digit;
    });

    this.setState({
      hexValuesToDigits: updatedHexValuesToDigits,
      hexValueIndexesToDigits: updatedHexValueIndexesToDigits,
    });
  };

  getNumber = () => {
    const {pixels} = this.props.pixelatedImage;
    const {hexValueIndexesToDigits} = this.state;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    let number = '';
    for (let rowId = 0; rowId < numRows; rowId++) {
      for (let columnId = 0; columnId < numColumns; columnId++) {
        number += hexValueIndexesToDigits[pixels[rowId][columnId].hexValueIndex];
      }
    }

    return number;
  };

  goToStep5 = () => {
    const {setImageNumberString} = this.props;
    const {hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    // Ensure each hex value has a unique digit assigned to it.
    let duplicateDigitEncountered = false;
    const digitsEncountered = new Set();
    _.forEach(hexValuesToDigits, (digit) => {
      if (digitsEncountered.has(digit)) {
        duplicateDigitEncountered = true;
      } else {
        digitsEncountered.add(digit);
      }
    });

    if (duplicateDigitEncountered) {
      this.setState({
        errorMessage:
          'Each color must be assigned a unique digit. If you want to merge colors, head back to the previous step.',
      });
    } else {
      setImageNumberString({
        hexValuesToDigits,
        hexValueIndexesToDigits,
        imageNumberString: this.getNumber(),
      });
    }
  };

  render() {
    const {pixelatedImage, pixelDimensions} = this.props;
    const {errorMessage, hexValuesToDigits, hexValueIndexesToDigits} = this.state;

    let errorContent;
    if (errorMessage !== null) {
      errorContent = <p className="error-message">{errorMessage}</p>;
    }

    const cellDimensions = {
      width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
    };

    return (
      <React.Fragment>
        <div className="step3">
          <StepInstructions>
            <p>Assign a unique digit for each color.</p>
            <p>See how your image looks with and without colors.</p>
          </StepInstructions>

          {errorContent}

          <div className="content-wrapper">
            <DigitImageEditor
              pixels={pixelatedImage.pixels}
              goToNextStep={this.goToStep5}
              cellDimensions={cellDimensions}
              hexValues={pixelatedImage.hexValues}
              hexValuesToDigits={hexValuesToDigits}
              hexValueIndexesToDigits={hexValueIndexesToDigits}
              changeHexValueDigit={this.changeHexValueDigit}
            />
          </div>
        </div>

        <style jsx>{`
          .step3 {
            text-align: center;
          }

          .content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .error-message {
            color: red;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Step4);

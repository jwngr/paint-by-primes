import _ from 'lodash';

import Button from '../Button';
import DigitImageEditor from '../DigitImageEditor';
import StepInstructions from '../StepInstructions';

import {withStore} from '../../Store';

class Step4 extends React.Component {
  constructor(props) {
    super(props);

    const hexValuesToDigits = {};
    _.forEach(this.props.pixelatedImage.hexValues, (hexValue, i) => {
      hexValuesToDigits[hexValue] = i + 1;
    });

    this.state = {
      hexValuesToDigits,
      errorMessage: null,
      isColorized: true,
    };
  }

  changeHexValueDigit = (hexValue, newDigit) => {
    // TODO: handle first digit starting with 0.
    const {hexValuesToDigits} = this.state;

    this.setState({
      hexValuesToDigits: {
        ...hexValuesToDigits,
        [hexValue]: newDigit,
      },
    });
  };

  getNumber = () => {
    const {pixels} = this.props.pixelatedImage;
    const {hexValuesToDigits} = this.state;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    let number = '';
    for (let i = 0; i < numColumns; i++) {
      for (let j = 0; j < numRows; j++) {
        number += hexValuesToDigits[pixels[i][j].hexValue];
      }
    }

    return number;
  };

  goToStep5 = () => {
    const {hexValuesToDigits} = this.state;
    const {setImageNumberString} = this.props;

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
        imageNumberString: this.getNumber(),
      });
    }
  };

  render() {
    const {pixelatedImage} = this.props;
    const {errorMessage, hexValuesToDigits} = this.state;

    let errorContent;
    if (errorMessage !== null) {
      errorContent = <p className="error-message">{errorMessage}</p>;
    }

    return (
      <React.Fragment>
        <div className="step3">
          <StepInstructions>
            <p>Assign a unique digit for each color.</p>
            <p>Toggle the colors on or off to see how the image looks.</p>
          </StepInstructions>

          {errorContent}

          <div className="content-wrapper">
            <DigitImageEditor
              pixels={pixelatedImage.pixels}
              hexValues={_.uniq(pixelatedImage.hexValues)}
              hexValuesToDigits={hexValuesToDigits}
              changeHexValueDigit={this.changeHexValueDigit}
            />
            <Button onClick={this.goToStep5}>GENERATE PRIME IMAGE!</Button>
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

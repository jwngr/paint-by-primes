import _ from 'lodash';

import Button from '../Button';
import StepInstructions from '../StepInstructions';

export default class Step4 extends React.Component {
  getNumber = () => {
    const {pixels, hexValuesToDigits} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    let number = '';
    for (let i = 0; i < numColumns; i++) {
      for (let j = 0; j < numRows; j++) {
        number += hexValuesToDigits[pixels[i][j]];
      }
    }

    return number;
  };

  render() {
    const {
      file,
      width,
      height,
      pixels,
      pixelWidth,
      pixelHeight,
      goToNextStep,
      hexValuesToDigits,
      digitsToHexValues,
    } = this.props;

    let numberImageContent;
    let continueButtonContent;
    if (pixels === null) {
      numberImageContent = <p>Analyzing image colors...</p>;
    } else {
      numberImageContent = (
        <div className="image-container">
          {_.map(hexValuesToDigits, (digit, colorHexValue) => {
            console.log(digit, colorHexValue);
            return (
              <div>
                <div style={{backgroundColor: colorHexValue, width: '20px', height: '20px'}}>
                  &nbsp;
                </div>
                <p>{digit}</p>
              </div>
            );
          })}

          {pixels.map((row, rowId) => {
            return (
              <p className="row" key={`row-${rowId}`}>
                {row.map((hexValue, columnId) => (
                  <span
                    className="digit"
                    style={{backgroundColor: hexValue, opacity: 0.5}}
                    key={`row-${rowId}-col-${columnId}`}
                  >
                    {hexValuesToDigits[hexValue]}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      );

      continueButtonContent = (
        <Button
          onClick={() =>
            goToNextStep({
              file,
              width,
              height,
              pixels,
              hexValuesToDigits,
              digitsToHexValues,
              number: this.getNumber(),
              pixelWidth,
              pixelHeight,
            })
          }
        >
          Continue
        </Button>
      );
    }

    return (
      <React.Fragment>
        <div className="step4">
          <StepInstructions>Personalize your image.</StepInstructions>
          {numberImageContent}
          {continueButtonContent}
        </div>
        <style jsx global>{`
          .step4 {
            text-align: center;
            border: solid 1px blue;
          }

          .row {
            display: flex;
            flex-direction: row;
            border: solid 1px green;
            margin: 0;
          }

          .digit {
            margin: 0;
            width: 20px;
            height: 20px;
            border: solid 1px black;
          }

          .image-container {
            position: relative;
            margin: auto;
            display: inline-block;
            border: solid 3px purple;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

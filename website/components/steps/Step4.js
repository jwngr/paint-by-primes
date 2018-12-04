import _ from 'lodash';

import StepInstructions from '../StepInstructions';

export default class Step4 extends React.Component {
  state = {
    pixels: null,
  };

  render() {
    const {
      file,
      width,
      height,
      colors,
      pixels,
      pixelWidth,
      pixelHeight,
      goToNextStep,
      reverseColorsMapping,
    } = this.props;

    let numberImageContent;
    let continueButtonContent;
    if (pixels === null) {
      numberImageContent = <p>Analyzing image colors...</p>;
    } else {
      numberImageContent = (
        <div className="image-container">
          {_.map(colors, (digit, colorHexValue) => {
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
                {row.map((digit, columnId) => (
                  <span
                    className="digit"
                    style={{backgroundColor: reverseColorsMapping[digit], opacity: 0.5}}
                    key={`row-${rowId}-col-${columnId}`}
                  >
                    {digit}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      );

      continueButtonContent = (
        <button
          onClick={() =>
            goToNextStep({
              file,
              width,
              height,
              pixels,
              colors,
              reverseColorsMapping,
              number: _.flatten(pixels).join(''),
              pixelWidth,
              pixelHeight,
            })
          }
        >
          Continue
        </button>
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

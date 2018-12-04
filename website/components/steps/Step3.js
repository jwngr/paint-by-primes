import _ from 'lodash';
import getPixels from 'get-pixels';
import colorDistance from 'color-difference';

import StepInstructions from '../StepInstructions';

const numberOrder = [1, 0, 7, 2, 3, 4, 5, 6, 8, 9];
const uniqueColors = new Set();
const colors = {};
const reverseColorsMapping = {};

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export default class Step3 extends React.Component {
  state = {
    pixels: null,
    isColored: true,
  };

  componentDidMount() {
    const {file, pixelWidth, pixelHeight} = this.props;

    getPixels(file, (err, pixels) => {
      if (err) {
        console.log('Bad image path');
        return;
      }

      var nx = pixels.shape[0];
      var ny = pixels.shape[1];

      console.log('DIMENSIONS:', nx, ny);

      const rows = [];
      for (var i = 0; i < ny / pixelHeight; ++i) {
        rows.push([]);
      }

      for (var i = 0; i < nx / pixelWidth; ++i) {
        for (var j = 0; j < ny / pixelHeight; ++j) {
          let count = 0;
          let totalR = 0;
          let totalG = 0;
          let totalB = 0;

          for (var offsetX = 0; offsetX < pixelWidth; offsetX++) {
            for (var offsetY = 0; offsetY < pixelHeight; offsetY++) {
              const R = pixels.get(i * pixelWidth + offsetX, j * pixelHeight + offsetY, 0);
              const G = pixels.get(i * pixelWidth + offsetX, j * pixelHeight + offsetY, 1);
              const B = pixels.get(i * pixelWidth + offsetX, j * pixelHeight + offsetY, 2);

              if (
                typeof R !== 'undefined' &&
                typeof G !== 'undefined' &&
                typeof B !== 'undefined'
              ) {
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

          let matchDistance = 35;
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
            // const digit = Object.keys(colors).length;
            const digit = numberOrder[Object.keys(colors).length];
            colors[matchColorString] = digit;
            reverseColorsMapping[digit] = matchColorString;
          }

          rows[j].push(colors[matchColorString]);
        }
      }

      const numColors = Object.keys(colors).length;

      console.log('NUM COLORS:', numColors, colors);

      if (numColors > 10) {
        console.log('Too many colors!');
      } else {
        this.setState({
          pixels: rows,
        });
        rows.forEach((row) => {
          console.log(row.join(''));
        });
      }
    });
  }

  toggleColors = () => {
    this.setState({
      isColored: !this.state.isColored,
    });
  };

  render() {
    const {pixels, isColored} = this.state;
    const {file, width, height, pixelWidth, pixelHeight, goToNextStep} = this.props;

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
                {row.map((digit, columnId) => {
                  const cellStyles = {};
                  if (isColored) {
                    cellStyles.backgroundColor = reverseColorsMapping[digit];
                    cellStyles.opacity = 0.5;
                  }
                  return (
                    <span className="digit" style={cellStyles} key={`row-${rowId}-col-${columnId}`}>
                      {digit}
                    </span>
                  );
                })}
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
              pixelWidth,
              pixelHeight,
              reverseColorsMapping,
            })
          }
        >
          Continue
        </button>
      );
    }

    return (
      <React.Fragment>
        <div className="step3">
          <StepInstructions>Assign a unique digit for each color in your image.</StepInstructions>
          <button onClick={this.toggleColors}>Toggle Colors</button>
          {numberImageContent}
          {continueButtonContent}
        </div>
        <style jsx global>{`
          .step3 {
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
            width: 10px;
            height: 10px;
            font-size: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: solid 1px black;
            font-family: 'Roboto Mono', monospace;
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

import Button from '../Button';
import StepInstructions from '../StepInstructions';

import colors from '../../resources/colors.json';

const DEFAULT_PIXEL_WIDTH = 4;
const DEFAULT_PIXEL_HEIGHT = 4;

export default class Step2 extends React.Component {
  state = {
    pixelWidth: DEFAULT_PIXEL_WIDTH,
    pixelHeight: DEFAULT_PIXEL_HEIGHT,
  };

  incrementPixelWidth = () => {
    this.setState({pixelWidth: this.state.pixelWidth + 1});
  };

  decrementPixelWidth = () => {
    this.setState({pixelWidth: this.state.pixelWidth - 1});
  };

  incrementPixelHeight = () => {
    this.setState({pixelHeight: this.state.pixelHeight + 1});
  };

  decrementPixelHeight = () => {
    this.setState({pixelHeight: this.state.pixelHeight - 1});
  };

  render() {
    const {pixelWidth, pixelHeight} = this.state;
    const {file, width: imageWidth, height: imageHeight, goToNextStep} = this.props;

    let width = imageWidth;
    let height = imageHeight;

    let pixelDimensionMultiplier = 1;

    while (width < 400) {
      width *= 2;
      height *= 2;
      pixelDimensionMultiplier /= 2;
    }

    while (width > 1000) {
      width /= 2;
      height /= 2;
      pixelDimensionMultiplier *= 2;
    }

    let pixelLines = [];
    for (let i = 0; i < width / pixelWidth; i++) {
      pixelLines.push(
        <div
          className="line"
          style={{
            position: 'absolute',
            borderLeft: `solid 1px ${colors.darkBlue}`,
            top: 0,
            left: i * pixelWidth,
            width: '1px',
            height: `${height}px`,
            opacity: 0.5,
          }}
          key={`horizontal-line-${i}`}
        >
          &nbsp;
        </div>
      );
    }

    for (let i = 0; i < height / pixelHeight; i++) {
      pixelLines.push(
        <div
          className="line"
          style={{
            position: 'absolute',
            borderTop: `solid 1px ${colors.darkBlue}`,
            top: i * pixelHeight,
            left: 0,
            width: `${width}px`,
            height: '1px',
            opacity: 0.5,
          }}
          key={`vertical-line-${i}`}
        >
          &nbsp;
        </div>
      );
    }

    let secondInstruction;
    if ((imageWidth / pixelWidth) * (imageHeight / pixelHeight) <= 2000) {
      secondInstruction = 'Your current selection looks good.';
    } else {
      secondInstruction = 'You should make your pixel size a bit bigger.';
    }

    return (
      <React.Fragment>
        <div className="step2">
          <StepInstructions>
            <p>Figure out how large to make each pixel.</p>
            <p>{secondInstruction}</p>
          </StepInstructions>

          <div className="content-wrapper">
            <div className="pixel-dimensions-wrapper">
              <div>
                <p>Pixel Width</p>
                <div>
                  <p className="minus-button" onClick={this.decrementPixelWidth}>
                    -
                  </p>
                  <p className="pixel-dimension">{pixelWidth}</p>
                  <p className="plus-button" onClick={this.incrementPixelWidth}>
                    +
                  </p>
                </div>
              </div>

              <div>
                <p>Pixel Height</p>
                <div>
                  <p className="minus-button" onClick={this.decrementPixelHeight}>
                    -
                  </p>
                  <p className="pixel-dimension">{pixelHeight}</p>
                  <p className="plus-button" onClick={this.incrementPixelHeight}>
                    +
                  </p>
                </div>
              </div>

              <Button
                onClick={() =>
                  goToNextStep({
                    file,
                    width: imageWidth,
                    height: imageHeight,
                    pixelWidth: pixelWidth * pixelDimensionMultiplier,
                    pixelHeight: pixelWidth * pixelDimensionMultiplier,
                  })
                }
              >
                PIXELATE
              </Button>
            </div>

            <div>
              <div className="image-wrapper">
                <img src={file} />
                {pixelLines}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .content-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }

          .step2 {
            text-align: center;
          }

          .image-wrapper {
            position: relative;
            display: inline-block;
          }

          .image-wrapper img {
            width: ${width}px;
            height: ${height}px;
          }

          .pixel-dimensions-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
          }

          .pixel-dimensions-wrapper > div {
            margin-bottom: 40px;
          }

          .pixel-dimensions-wrapper > div > p {
            font-size: 20px;
            font-weight: bold;
          }

          .pixel-dimensions-wrapper > div > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .pixel-dimension {
            font-size: 40px;
            margin: 0 8px;
            min-width: 48px;
          }

          .plus-button,
          .minus-button {
            font-size: 32px;
          }

          .plus-button:hover,
          .minus-button:hover {
            color: ${colors.red};
            cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

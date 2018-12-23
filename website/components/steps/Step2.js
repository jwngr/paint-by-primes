import Link from 'next/link';

import Button from '../Button';
import StepInstructions from '../StepInstructions';

import colors from '../../resources/colors.json';

import {withStore} from '../../Store';
import {getNumberWithCommas} from '../../utils';

const MAX_DIGITS = 3000;
const MAX_DIGITS_WITHOUT_WARNING = 1500;
const DEFAULT_PIXEL_WIDTH = 8;
const DEFAULT_PIXEL_HEIGHT = 8;

const getDigitsCountColor = (digitsCount) => {
  if (digitsCount > MAX_DIGITS) {
    return colors.peach.medium;
  } else if (digitsCount > MAX_DIGITS_WITHOUT_WARNING) {
    return colors.yellow.darker;
  } else {
    return colors.moss.darkest;
  }
};

const getTimeEstimate = (digitsCount) => {
  if (digitsCount > MAX_DIGITS) {
    return 'Too long';
  } else {
    const estimateInSeconds = Math.round(digitsCount * 0.25);
    if (estimateInSeconds < 60) {
      const secOrSecs = estimateInSeconds === 1 ? 'sec' : 'secs';
      return `${estimateInSeconds}  ${secOrSecs}`;
    } else {
      const estimateInMinutes = Math.round(estimateInSeconds / 60).toFixed(0);
      const minOrMins = estimateInMinutes === 1 ? 'min' : 'mins';
      return `${estimateInMinutes}  ${minOrMins}`;
    }
  }
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    const {sourceImage} = props;

    this.width = sourceImage.width;
    this.height = sourceImage.height;

    this.pixelDimensionMultiplier = 1;

    while (this.width < 400) {
      this.width *= 2;
      this.height *= 2;
      this.pixelDimensionMultiplier /= 2;
    }

    while (this.width > 1000) {
      this.width /= 2;
      this.height /= 2;
      this.pixelDimensionMultiplier *= 2;
    }

    this.state = {
      errorMessage: null,
      pixelWidth: DEFAULT_PIXEL_WIDTH,
      pixelHeight: DEFAULT_PIXEL_HEIGHT,
      digitsCount: this.getDigitsCount(DEFAULT_PIXEL_WIDTH, DEFAULT_PIXEL_HEIGHT),
    };
  }

  getDigitsCount = (pixelWidth = this.state.pixelWidth, pixelHeight = this.state.pixelHeight) => {
    const {sourceImage} = this.props;

    return (
      Math.ceil(sourceImage.width / (pixelWidth * this.pixelDimensionMultiplier)) *
      Math.ceil(sourceImage.height / (pixelHeight * this.pixelDimensionMultiplier))
    );
  };

  updatePixelWidth = (amount) => {
    const {pixelWidth, pixelHeight} = this.state;

    const updatedPixelWidth = Math.max(pixelWidth + amount, 1);

    this.setState({
      pixelWidth: updatedPixelWidth,
      digitsCount: this.getDigitsCount(updatedPixelWidth, pixelHeight),
    });
  };

  updatePixelHeight = (amount) => {
    const {pixelWidth, pixelHeight} = this.state;

    const updatedPixelHeight = Math.max(pixelHeight + amount, 1);

    this.setState({
      pixelHeight: updatedPixelHeight,
      digitsCount: this.getDigitsCount(pixelWidth, updatedPixelHeight),
    });
  };

  render() {
    const {sourceImage, setPixelDimensions} = this.props;
    const {pixelWidth, pixelHeight, digitsCount} = this.state;

    const digitsCountColor = getDigitsCountColor(digitsCount);

    let pixelLines = [];
    for (let i = 0; i < this.width / pixelWidth; i++) {
      pixelLines.push(
        <div
          className="line"
          style={{
            position: 'absolute',
            borderLeft: `solid 1px ${colors.darkBlue}`,
            top: 0,
            left: i * pixelWidth,
            width: '1px',
            height: `${this.height}px`,
            opacity: 0.5,
          }}
          key={`horizontal-line-${i}`}
        >
          &nbsp;
        </div>
      );
    }

    for (let i = 0; i < this.height / pixelHeight; i++) {
      pixelLines.push(
        <div
          className="line"
          style={{
            position: 'absolute',
            borderTop: `solid 1px ${colors.darkBlue}`,
            top: i * pixelHeight,
            left: 0,
            width: `${this.width}px`,
            height: '1px',
            opacity: 0.5,
          }}
          key={`vertical-line-${i}`}
        >
          &nbsp;
        </div>
      );
    }

    return (
      <React.Fragment>
        <React.Fragment>
          <StepInstructions>
            <p>Determine how large to make the image.</p>
            <p>The more pixels, the more digits, and the longer it will take to find a prime.</p>
          </StepInstructions>

          <div className="content-wrapper">
            <div>
              <div className="pixel-dimensions-wrapper">
                <div className="pixel-dimension">
                  <p>Pixel Width</p>
                  <div>
                    <p
                      className={`minus-button ${pixelWidth === 1 && 'hidden'}`}
                      onClick={() => this.updatePixelWidth(-1)}
                    >
                      -
                    </p>
                    <p className="pixel-dimension-value">{pixelWidth}</p>
                    <p className="plus-button" onClick={() => this.updatePixelWidth(1)}>
                      +
                    </p>
                  </div>
                </div>

                <div className="pixel-dimension">
                  <p>Pixel Height</p>
                  <div>
                    <p
                      className={`minus-button ${pixelHeight === 1 && 'hidden'}`}
                      onClick={() => this.updatePixelHeight(-1)}
                    >
                      -
                    </p>
                    <p className="pixel-dimension-value">{pixelHeight}</p>
                    <p className="plus-button" onClick={() => this.updatePixelHeight(1)}>
                      +
                    </p>
                  </div>
                </div>

                <div className="pixel-dimension digits-count">
                  <p>Total Digits</p>
                  <div>
                    <p className="pixel-dimension-value">{getNumberWithCommas(digitsCount)}</p>
                  </div>
                </div>

                <div className="pixel-dimension time-estimate">
                  <p>Time Estimate</p>
                  <div>
                    <p className="pixel-dimension-value">{getTimeEstimate(digitsCount)}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() =>
                  setPixelDimensions({
                    width: pixelWidth * this.pixelDimensionMultiplier,
                    height: pixelHeight * this.pixelDimensionMultiplier,
                    zoomedWidth: this.width,
                    zoomedHeight: this.height,
                  })
                }
                disabled={digitsCount > MAX_DIGITS}
              >
                Pixelate
              </Button>
            </div>
            <div>
              <div className="image-wrapper">
                <img src={sourceImage.file} alt="Source image" />
                {pixelLines}
              </div>
            </div>
          </div>
        </React.Fragment>

        <style jsx>{`
          .content-wrapper {
            display: flex;
            text-align: center;
            flex-direction: row;
            justify-content: center;
          }

          .image-wrapper {
            position: relative;
            display: inline-block;
          }

          .image-wrapper img {
            width: ${this.width}px;
            height: ${this.height}px;
          }

          .pixel-dimensions-wrapper {
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 1fr;
            width: 400px;
            height: 200px;
            margin: 0 20px 20px 0;
          }

          .pixel-dimensions-wrapper > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items; center;
          }

          .pixel-dimension {
            color: ${colors.blue.medium};
          }

          .digits-count,
          .time-estimate {
            color: ${digitsCountColor};
          }

          .pixel-dimension > p {
            font-size: 20px;
            font-weight: bold;
          }

          .pixel-dimension > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .minus-button.hidden {
            visibility: hidden;
          }

          .pixel-dimension-value {
            font-size: 40px;
            margin: 0 8px;
            min-width: 48px;
          }

          .plus-button,
          .minus-button {
            font-size: 32px;
            user-select: none;
          }

          .plus-button:hover,
          .minus-button:hover {
            cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Step2);

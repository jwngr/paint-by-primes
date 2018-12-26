import Link from 'next/link';

import Button from '../Button';
import StepInstructions from '../StepInstructions';

import colors from '../../resources/colors.json';

import {withStore} from '../../Store';
import {getNumberWithCommas} from '../../utils';

const MAX_DIGITS = 4000;
const MAX_DIGITS_WITHOUT_WARNING = 2500;

const getDigitsCountColor = (digitsCount) => {
  if (digitsCount > MAX_DIGITS) {
    return colors.peach.darker;
  } else if (digitsCount > MAX_DIGITS_WITHOUT_WARNING) {
    return colors.yellow.darker;
  } else {
    return colors.moss.darkest;
  }
};

const getTimeEstimateMessage = (digitsCount, digitsCountColor) => {
  let message;
  let boldText;
  if (digitsCount > MAX_DIGITS) {
    boldText = 'Hold on...';
    message =
      'it will take too long to generate your prime image. Reduce its size by increasing your pixel dimensions.';
  } else if (digitsCount > MAX_DIGITS_WITHOUT_WARNING) {
    boldText = 'Just so you know...';
    message = 'it will take at least five minutes to generate a prime image with this many digits.';
  } else {
    boldText = 'Nice!';
    message = 'Your pixel dimensions will work great.';
  }

  return (
    <React.Fragment>
      <p className="time-estimate-message">
        <b>{boldText}</b> {message}
      </p>
      <style jsx>{`
        .time-estimate-message {
          width: 340px;
          margin: auto;
          margin-bottom: 20px;
        }

        .time-estimate-message b {
          color: ${digitsCountColor};
        }
      `}</style>
    </React.Fragment>
  );
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

    const initialPixelWidth = Math.floor(sourceImage.width / 50);
    const initialPixelHeight = Math.floor(sourceImage.height / 50);

    this.state = {
      errorMessage: null,
      pixelWidth: initialPixelWidth,
      pixelHeight: initialPixelHeight,
      maxPixelWidth: Math.floor(sourceImage.width / 4),
      maxPixelHeight: Math.floor(sourceImage.height / 4),
      targetDimensions: this.getTargetDimensions(initialPixelWidth, initialPixelHeight),
    };
  }

  getTargetDimensions = (pixelWidth, pixelHeight) => {
    const {sourceImage} = this.props;

    return {
      width: Math.ceil(sourceImage.width / pixelWidth),
      height: Math.ceil(sourceImage.height / pixelHeight),
    };
  };

  updatePixelWidth = (amount) => {
    const {pixelWidth, pixelHeight, maxPixelWidth} = this.state;

    // Update the pixel width, ensuring it is a positive integer no greater than the max pixel
    // width.
    let updatedPixelWidth = pixelWidth + amount;
    updatedPixelWidth = Math.max(updatedPixelWidth, 1);
    updatedPixelWidth = Math.min(updatedPixelWidth, maxPixelWidth);

    this.setState({
      pixelWidth: updatedPixelWidth,
      targetDimensions: this.getTargetDimensions(updatedPixelWidth, pixelHeight),
    });
  };

  updatePixelHeight = (amount) => {
    const {pixelWidth, pixelHeight, maxPixelHeight} = this.state;

    // Update the pixel height, ensuring it is a positive integer no greater than the max pixel
    // height.
    let updatedPixelHeight = pixelHeight + amount;
    updatedPixelHeight = Math.max(updatedPixelHeight, 1);
    updatedPixelHeight = Math.min(updatedPixelHeight, maxPixelHeight);

    this.setState({
      pixelHeight: updatedPixelHeight,
      targetDimensions: this.getTargetDimensions(pixelWidth, updatedPixelHeight),
    });
  };

  render() {
    const {sourceImage, setPixelDimensions} = this.props;
    const {pixelWidth, pixelHeight, maxPixelWidth, maxPixelHeight, targetDimensions} = this.state;

    const digitsCount = targetDimensions.width * targetDimensions.height;
    const digitsCountColor = getDigitsCountColor(digitsCount);

    const scaledPixelWidth = pixelWidth / this.pixelDimensionMultiplier;
    const scaledPixelHeight = pixelHeight / this.pixelDimensionMultiplier;

    let pixelLines = [];
    for (let i = 0; i < this.width / scaledPixelWidth; i++) {
      pixelLines.push(
        <div
          style={{
            position: 'absolute',
            borderLeft: `solid 1px ${colors.gray.darkest}b0`,
            top: 0,
            left: i * scaledPixelWidth,
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

    for (let i = 0; i < this.height / scaledPixelHeight; i++) {
      pixelLines.push(
        <div
          className="line"
          style={{
            position: 'absolute',
            borderTop: `solid 1px ${colors.gray.darkest}b0`,
            top: i * scaledPixelHeight,
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
            <p>
              <b>Calculate the length of your prime image.</b>
            </p>
            <p>Smaller pixels result in more digits and a longer search for your prime.</p>
          </StepInstructions>

          <div className="content-wrapper">
            <div className="left-content-wrapper">
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
                    <p
                      className={`plus-button ${pixelWidth === maxPixelWidth && 'hidden'}`}
                      onClick={() => this.updatePixelWidth(1)}
                    >
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
                    <p
                      className={`plus-button ${pixelHeight === maxPixelHeight && 'hidden'}`}
                      onClick={() => this.updatePixelHeight(1)}
                    >
                      +
                    </p>
                  </div>
                </div>
              </div>

              <div className="total-pixels">
                <p>Image Dimensions</p>
                <div>
                  <p>
                    {getNumberWithCommas(targetDimensions.width)} &times;{' '}
                    {getNumberWithCommas(targetDimensions.height)}
                  </p>
                </div>
              </div>

              <div className="total-pixels">
                <p>Pixel / Digit Count</p>
                <div>
                  <p>{getNumberWithCommas(digitsCount)}</p>
                </div>
              </div>

              {getTimeEstimateMessage(digitsCount, digitsCountColor)}

              <Button
                onClick={() =>
                  setPixelDimensions({
                    width: pixelWidth,
                    height: pixelHeight,
                  })
                }
                disabled={digitsCount > MAX_DIGITS}
              >
                Pixelate
              </Button>
            </div>

            <div className="right-content-wrapper">
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
          }

          .left-content-wrapper {
            width: 400px;
            margin-right: 20px;
          }

          .pixel-dimensions-wrapper {
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 8px;
          }

          .pixel-dimension {
            flex: 1;
            color: ${colors.blue.medium};
          }

          .pixel-dimension > p {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 4px;
          }

          .pixel-dimension > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
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

          .plus-button.hidden,
          .minus-button.hidden {
            visibility: hidden;
          }

          .total-pixels {
            width: 60%;
            margin: 0 auto 20px auto;
            border: solid 1px blue;
            color: ${digitsCountColor};
            border: solid 6px ${digitsCountColor};
            border-top: none;
          }

          .digits-count,
          .time-estimate {
            color: ${digitsCountColor};
            border: solid 6px ${digitsCountColor};
            border-top: none;
          }

          .total-pixels > p,
          .time-estimate > p {
            padding: 8px 0;
            font-size: 20px;
            font-weight: bold;
            color: ${colors.white};
            text-shadow: 1px 1px 6px ${colors.gray.darkest};
            background-color: ${digitsCountColor};
          }

          .total-pixels > div,
          .time-estimate > div {
            font-size: 32px;
            padding: 8px 0;
            text-align: center;
          }

          .image-wrapper {
            display: flex;
            position: relative;
            border: solid 6px ${colors.blue.medium};
          }

          .image-wrapper img {
            width: ${this.width}px;
            height: ${this.height}px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Step2);

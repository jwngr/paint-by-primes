import StepInstructions from '../StepInstructions';

const DEFAULT_PIXEL_WIDTH = 4;
const DEFAULT_PIXEL_HEIGHT = 4;

export default class Step2 extends React.Component {
  state = {
    pixelWidth: DEFAULT_PIXEL_WIDTH,
    pixelHeight: DEFAULT_PIXEL_HEIGHT,
  };

  onChangePixelWidth = (event) => {
    this.setState({pixelWidth: event.target.value});
  };

  onChangePixelHeight = (event) => {
    this.setState({pixelHeight: event.target.value});
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

    console.log('pixelDimensionMultiplier:', pixelDimensionMultiplier);

    let pixelLines = [];
    for (let i = 0; i < width / pixelWidth; i++) {
      pixelLines.push(
        <div
          className="line"
          style={{
            position: 'absolute',
            borderLeft: 'solid 1px red',
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
            borderTop: 'solid 1px red',
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

    return (
      <React.Fragment>
        <div className="step2">
          <StepInstructions>Determine the pixel dimensions based on your image.</StepInstructions>

          <div>
            <label>Pixel Width:</label>
            <input type="number" value={pixelWidth} onChange={this.onChangePixelWidth} />
          </div>
          <div>
            <label>Pixel Height:</label>
            <input type="number" value={pixelHeight} onChange={this.onChangePixelHeight} />
          </div>

          <div>
            <div className="image-container">
              <img src={file} />
              {pixelLines}
            </div>
          </div>

          <button
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
            Continue
          </button>
        </div>
        <style jsx>{`
          .step2 {
            text-align: center;
          }

          .image-container {
            position: relative;
            margin: auto;
            display: inline-block;
          }

          .image-container img {
            width: ${width}px;
            height: ${height}px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

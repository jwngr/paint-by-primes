import StepInstructions from '../StepInstructions';
import PixelatedImageEditor from '../PixelatedImageEditor';

import colors from '../../resources/colors.json';

import {pixelate} from '../../pixelator.js';
import {withStore} from '../../Store';

class Step3 extends React.Component {
  state = {
    pixels: null,
    hexValues: null,
    errorMessage: null,
  };

  componentDidMount() {
    const {sourceImage, pixelDimensions} = this.props;

    return pixelate(sourceImage.file, pixelDimensions)
      .then(({pixels, hexValues}) => {
        this.setState({
          pixels,
          hexValues,
          errorMessage: null,
        });
      })
      .catch((error) => {
        this.setState({errorMessage: `Failed to pixelate image: ${error.message}`});
      });
  }

  changeHexValue = (hexValuesIndex, {hex: updatedHexValue}) => {
    const {hexValues} = this.state;

    const updatedHexValues = _.clone(hexValues);
    updatedHexValues[hexValuesIndex] = updatedHexValue;

    this.setState({
      hexValues: updatedHexValues,
    });
  };

  cyclePixelHexValue = (rowId, columnId, currentHexValueIndex) => {
    const {pixels, hexValues} = this.state;

    // Convert the current hex value index into an index into an array of unique hex values.
    const currentHexValue = hexValues[currentHexValueIndex];
    const uniqueHexValues = _.uniq(hexValues);
    const currentUniqueHexValueIndex = uniqueHexValues.indexOf(currentHexValue);

    // Get the next unique hex value.
    let nextHexValue = uniqueHexValues[(currentUniqueHexValueIndex + 1) % uniqueHexValues.length];

    // Find the first hex value index (starting at the current hex value index) whose hex value is
    // equal to the next unique hex value.
    let nextHexValueIndex = currentHexValueIndex;
    do {
      nextHexValueIndex = (nextHexValueIndex + 1) % hexValues.length;
    } while (nextHexValue !== hexValues[nextHexValueIndex]);

    // Update the hex value index for that relevant pixel.
    const updatedPixels = _.clone(pixels);
    updatedPixels[rowId][columnId] = {
      hexValueIndex: nextHexValueIndex,
    };

    this.setState({
      pixels: updatedPixels,
    });
  };

  render() {
    const {pixels, hexValues, errorMessage} = this.state;
    const {setPixelatedImage, pixelDimensions} = this.props;

    const cellDimensions = {
      width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
    };

    if (errorMessage !== null) {
      return <p>Error! {errorMessage}</p>;
    } else if (pixels === null) {
      return <p>Pixelating image...</p>;
    }

    return (
      <React.Fragment>
        <div className="step3">
          <StepInstructions>
            <p>Modify your color palette.</p>
            <p>Each color represents a unique digit.</p>
          </StepInstructions>

          <div className="content-wrapper">
            <PixelatedImageEditor
              pixels={pixels}
              hexValues={hexValues}
              cellDimensions={cellDimensions}
              changeHexValue={this.changeHexValue}
              cyclePixelHexValue={this.cyclePixelHexValue}
              goToNextStep={() =>
                setPixelatedImage({
                  pixels,
                  hexValues,
                })
              }
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
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Step3);

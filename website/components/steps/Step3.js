import Button from '../Button';
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
    const {pixels, hexValues} = this.state;

    const updatedPixels = _.clone(pixels);
    const updatedHexValues = _.clone(hexValues);

    updatedHexValues[hexValuesIndex] = updatedHexValue;

    updatedPixels.map((row, rowId) => {
      row.map(({colorIndex}, columnId) => {
        if (hexValuesIndex === colorIndex) {
          updatedPixels[rowId][columnId].hexValue = updatedHexValue;
        }
      });
    });

    this.setState({
      pixels: updatedPixels,
      hexValues: updatedHexValues,
    });
  };

  togglePixelHexValue = (rowId, columnId, currentHexValue) => {
    const {pixels, hexValues} = this.state;

    const currentIndex = hexValues.indexOf(currentHexValue);
    const nextIndex = (currentIndex + 1) % hexValues.length;

    const updatedPixels = _.clone(pixels);
    updatedPixels[rowId][columnId] = {
      hexValue: hexValues[nextIndex],
      colorIndex: nextIndex,
    };

    this.setState({
      pixels: updatedPixels,
    });
  };

  render() {
    const {setPixelatedImage} = this.props;

    const {pixels, hexValues} = this.state;

    if (pixels === null) {
      return <p>Pixelating image...</p>;
    }

    return (
      <React.Fragment>
        <div className="step3">
          <StepInstructions>
            <p>Fix colors.</p>
            <p>This instruction sucks.</p>
          </StepInstructions>

          <div className="content-wrapper">
            <PixelatedImageEditor
              pixels={pixels}
              hexValues={hexValues}
              changeHexValue={this.changeHexValue}
              togglePixelHexValue={this.togglePixelHexValue}
            />
            <Button
              onClick={() =>
                setPixelatedImage({
                  pixels,
                  hexValues,
                })
              }
            >
              LOOKS GOOD!
            </Button>
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

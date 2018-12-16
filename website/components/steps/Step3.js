import Button from '../Button';
import StepInstructions from '../StepInstructions';
import PixelatedImageEditor from '../PixelatedImageEditor';

import colors from '../../resources/colors.json';

import {pixelate} from '../../pixelator.js';
import {withStore} from '../../Store';

class Step3 extends React.Component {
  state = {
    pixels: null,
    errorMessage: null,
    uniqueHexValues: null,
  };

  componentDidMount() {
    const {sourceImage, pixelDimensions} = this.props;

    return pixelate(sourceImage.file, pixelDimensions)
      .then(({pixels, uniqueHexValues}) => {
        this.setState({
          pixels,
          uniqueHexValues,
          errorMessage: null,
        });
      })
      .catch((error) => {
        this.setState({errorMessage: `Failed to pixelate image: ${error.message}`});
      });
  }

  changeHexValue = (uniqueHexValuesIndex, {hex: updatedHexValue}) => {
    const {pixels, uniqueHexValues} = this.state;

    const updatedPixels = _.clone(pixels);
    const updatedUniqueHexValues = _.clone(uniqueHexValues);

    updatedUniqueHexValues[uniqueHexValuesIndex] = updatedHexValue;

    updatedPixels.map((row, rowId) => {
      row.map(({colorIndex}, columnId) => {
        if (uniqueHexValuesIndex === colorIndex) {
          updatedPixels[rowId][columnId].hexValue = updatedHexValue;
        }
      });
    });

    this.setState({
      pixels: updatedPixels,
      uniqueHexValues: updatedUniqueHexValues,
    });
  };

  togglePixelHexValue = (rowId, columnId, currentHexValue) => {
    const {pixels, uniqueHexValues} = this.state;

    const currentIndex = uniqueHexValues.indexOf(currentHexValue);
    const nextIndex = (currentIndex + 1) % uniqueHexValues.length;

    const updatedPixels = _.clone(pixels);
    updatedPixels[rowId][columnId] = {
      hexValue: uniqueHexValues[nextIndex],
      colorIndex: nextIndex,
    };

    this.setState({
      pixels: updatedPixels,
    });
  };

  render() {
    const {setPixelatedImage} = this.props;

    const {pixels, uniqueHexValues} = this.state;

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
              uniqueHexValues={uniqueHexValues}
              changeHexValue={this.changeHexValue}
              togglePixelHexValue={this.togglePixelHexValue}
            />
            <Button
              onClick={() =>
                setPixelatedImage({
                  pixels,
                  uniqueHexValues,
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

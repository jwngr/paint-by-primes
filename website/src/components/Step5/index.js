import React from 'react';

import PrimeImage from '../PrimeImage';
import StepInstructions from '../StepInstructions';

const ADMIN_SERVER_API_HOST = 'http://localhost:3373/primes';

class Step5 extends React.Component {
  state = {
    errorMessage: null,
    primeNumberString: null,
  };

  constructor(props) {
    super(props);

    const {
      digitMappings,
      pixelatedImage: {pixels},
    } = props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    this.imageNumber = '';
    for (let rowId = 0; rowId < numRows; rowId++) {
      for (let columnId = 0; columnId < numColumns; columnId++) {
        this.imageNumber +=
          digitMappings.hexValueIndexesToDigits[pixels[rowId][columnId].hexValueIndex];
      }
    }
  }

  componentDidMount() {
    const {setPrimeImage} = this.props;

    return fetch(ADMIN_SERVER_API_HOST, {
      method: 'POST',
      body: JSON.stringify({
        number: this.imageNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === 'object' && 'error' in data) {
          this.setState({
            errorMessage: `Failed to fetch prime number: ${data.error.message}`,
          });
        } else {
          setPrimeImage({
            primeNumberString: data,
          });
          this.setState({
            errorMessage: null,
            primeNumberString: data,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  render() {
    const {errorMessage, primeNumberString} = this.state;
    const {pixelatedImage, pixelDimensions} = this.props;

    const cellDimensions = {
      width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
      height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
    };

    let mainContent;
    if (errorMessage !== null) {
      console.log('error:', errorMessage);
      mainContent = (
        <React.Fragment>
          <StepInstructions>
            <p>Something went wrong while generating your prime image.</p>
            <p>Head back to the previous step and try again!</p>
          </StepInstructions>
          <p>{errorMessage}</p>;
        </React.Fragment>
      );
    } else if (primeNumberString === null) {
      console.log('other:', primeNumberString);
      mainContent = (
        <React.Fragment>
          <StepInstructions>
            <p>Wait for your prime image to be generated.</p>
            <p>This may take several minutes.</p>
          </StepInstructions>

          <p>This URL is permanent, so feel free to close this page and come back later:</p>
          <p>htttps://TODO.com/p/TODO</p>

          <p>While you wait, did you know...</p>
          <p>
            The largest known prime is 2<sup>82,589,933</sup> − 1 with a whopping 24,862,048 digits?
          </p>
          <p>Generating a prime image with {this.imageNumber.length} digits</p>
        </React.Fragment>
      );
    } else {
      console.log('primeNumberString:', primeNumberString);
      mainContent = (
        <React.Fragment>
          <StepInstructions>
            <p>Your prime image is ready!</p>
            <p>Remix it to your liking to share with your friends!</p>
          </StepInstructions>

          <PrimeImage
            pixels={pixelatedImage.pixels}
            cellDimensions={cellDimensions}
            hexValues={pixelatedImage.hexValues}
            primeNumberString={primeNumberString}
          />
        </React.Fragment>
      );
    }

    return <div>{mainContent}</div>;
  }
}

export default Step5;

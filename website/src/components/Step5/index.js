import React from 'react';

import PrimeImage from '../PrimeImage';
import StepInstructions from '../StepInstructions';

class Step5 extends React.Component {
  state = {
    primeNumberString: null,
    errorMessage: null,
  };

  componentDidMount() {
    const {
      setPrimeImage,
      digitMappings,
      pixelatedImage: {pixels},
    } = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    this.imageNumber = '';
    for (let rowId = 0; rowId < numRows; rowId++) {
      for (let columnId = 0; columnId < numColumns; columnId++) {
        this.imageNumber +=
          digitMappings.hexValueIndexesToDigits[pixels[rowId][columnId].hexValueIndex];
      }
    }

    return fetch('http://localhost:3373/primes', {
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

    return (
      <div>
        <StepInstructions>
          <p>Wait for your prime image to be generated.</p>
          <p>Note that this may take several minutes.</p>
        </StepInstructions>

        <p>Number: {this.imageNumber}</p>
        <p>Result: {primeNumberString}</p>
        <p>Error: {errorMessage}</p>

        {primeNumberString && (
          <PrimeImage
            pixels={pixelatedImage.pixels}
            cellDimensions={cellDimensions}
            hexValues={pixelatedImage.hexValues}
            primeNumberString={primeNumberString}
          />
        )}
      </div>
    );
  }
}

export default Step5;

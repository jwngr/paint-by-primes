import React from 'react';

import {db} from '../../loadFirebase';

import PrimeImage from '../PrimeImage';
import StepInstructions from '../StepInstructions';

import {MainContentWrapper} from './index.styles';

const ADMIN_SERVER_API_HOST = 'http://localhost:3373/primes';

class Step5 extends React.Component {
  state = {
    errorMessage: null,
    primeNumberString: null,
  };

  async componentDidMount() {
    let {primeImageId, pixelatedImage, setStateFromFirestore} = this.props;

    if (pixelatedImage === null) {
      return db
        .doc(`primeImages/${primeImageId}`)
        .get()
        .then((primeImageDoc) => {
          if (!primeImageDoc.exists) {
            // TODO: cleanly handle this case.
            this.setState({
              errorMessage: 'Prime image not found',
            });
          } else {
            const data = primeImageDoc.data();
            pixelatedImage = data.pixelatedImage;
            pixelatedImage.pixelHexValueIndexes = JSON.parse(pixelatedImage.pixelHexValueIndexes);

            setStateFromFirestore({
              ...data,
              pixelatedImage,
              currentStep: 5,
              latestCompletedStep: 5,
            });

            if (data.primeNumberString) {
              this.setState({
                primeNumberString: data.primeNumberString,
              });
            } else {
              this.fetchPrimeNumberString();
            }
          }
        });
    } else {
      this.fetchPrimeNumberString();
    }
  }

  fetchPrimeNumberString = () => {
    const {primeImageId, setPrimeImage, pixelatedImage, digitMappings} = this.props;

    const numRows = pixelatedImage.pixelHexValueIndexes.length;
    const numColumns = pixelatedImage.pixelHexValueIndexes[0].length;

    this.imageNumber = '';
    for (let rowId = 0; rowId < numRows; rowId++) {
      for (let columnId = 0; columnId < numColumns; columnId++) {
        this.imageNumber +=
          digitMappings.hexValueIndexesToDigits[
            pixelatedImage.pixelHexValueIndexes[rowId][columnId]
          ];
      }
    }

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
          db.doc(`primeImages/${primeImageId}`).update({
            primeNumberString: data,
          });
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
  };

  render() {
    const {errorMessage, primeNumberString} = this.state;
    const {primeImageId, pixelatedImage, pixelDimensions} = this.props;

    let mainContent;
    if (errorMessage !== null) {
      mainContent = (
        <React.Fragment>
          <StepInstructions>
            <p>Something went wrong while generating your prime image.</p>
            <p>Head back to the previous step and try again!</p>
          </StepInstructions>
          <p>{errorMessage}</p>
        </React.Fragment>
      );
    } else if (primeNumberString === null) {
      mainContent = (
        <React.Fragment>
          <StepInstructions>
            <p>Wait for your prime image to be generated.</p>
            <p>This may take several minutes.</p>
          </StepInstructions>

          <p>This URL is permanent, so feel free to close this page and come back later:</p>
          <p>https://TODO.com/p/{primeImageId}</p>

          <p>While you wait, did you know...</p>
          <p>
            The largest known prime is 2<sup>82,589,933</sup> − 1 with a whopping 24,862,048 digits?
          </p>
          {this.imageNumber && (
            <p>Generating a prime image with {this.imageNumber.length} digits</p>
          )}
        </React.Fragment>
      );
    } else {
      const cellDimensions = {
        width: Math.ceil(pixelDimensions.width / pixelDimensions.scaleFactor),
        height: Math.ceil(pixelDimensions.height / pixelDimensions.scaleFactor),
      };

      mainContent = (
        <React.Fragment>
          <div>
            <StepInstructions>
              <p>Your prime image is ready!</p>
              <p>Remix it to your liking to share with your friends!</p>
            </StepInstructions>
          </div>

          <PrimeImage
            cellDimensions={cellDimensions}
            hexValues={pixelatedImage.hexValues}
            primeNumberString={primeNumberString}
            pixelHexValueIndexes={pixelatedImage.pixelHexValueIndexes}
          />
        </React.Fragment>
      );
    }

    return <MainContentWrapper>{mainContent}</MainContentWrapper>;
  }
}

export default Step5;

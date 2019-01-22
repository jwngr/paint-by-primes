import React from 'react';
import PropTypes from 'prop-types';

import {db} from '../../loadFirebase';

import StatsCard from './StatsCard';
import ShareCard from './ShareCard';
import PrimeImage from './PrimeImage';
import ProgressCard from './ProgressCard';
import LoadingIndicator from './LoadingIndicator2';
import StepInstructions from '../StepInstructions';
import PrimeImageControlsCard from './PrimeImageControlsCard';
import CompletionNotificationCard from './CompletionNotificationCard';

import {
  CardsWrapper,
  ContentWrapper,
  CardsAndButtonWrapper,
  RightLoadingContentWrapper,
} from './index.styles';

const ADMIN_SERVER_API_HOST = 'http://localhost:3373/primes';

// TODO: figure out max font size?
const MAX_PRIME_IMAGE_FONT_SIZE = 18;

class Step5 extends React.Component {
  state = {
    errorMessage: null,
    primeImageRef: null,
    primeNumberString: null,
    primeImageSettings: {
      opacity: 0.5,
      fontSize: 12,
      isColorized: true,
      hasBorders: false,
    },
  };

  async componentDidMount() {
    let {primeImage, primeImageId, pixelatedImage, setStateFromFirestore} = this.props;

    if (primeImage !== null) {
      this.setState({
        primeNumberString: primeImage.primeNumberString,
      });
    } else if (pixelatedImage === null) {
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
            const parsedPixelatedImage = data.pixelatedImage;
            parsedPixelatedImage.pixelHexValueIndexes = JSON.parse(
              parsedPixelatedImage.pixelHexValueIndexes
            );

            const hasFoundPrimeImage = 'primeImage' in data;

            setStateFromFirestore({
              ...data,
              pixelatedImage: parsedPixelatedImage,
              currentStep: 5,
              latestCompletedStep: hasFoundPrimeImage ? 5 : 4,
            });

            if (hasFoundPrimeImage) {
              this.setState({
                primeNumberString: data.primeImage.primeNumberString,
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

  setPrimeImageRef = (ref) => {
    this.setState({
      primeImageRef: ref,
    });
  };

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
        primeImageId,
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
  };

  updatePrimeImageOpacity = (amount) => {
    const {primeImageSettings} = this.state;

    // Update the pixel width, ensuring it is a positive integer no greater than the max font size.
    let updatedPrimeImageOpacity = primeImageSettings.opacity + amount;
    updatedPrimeImageOpacity = Math.max(updatedPrimeImageOpacity, 0);
    updatedPrimeImageOpacity = Math.min(updatedPrimeImageOpacity, 1);

    this.setState(({primeImageSettings}) => ({
      primeImageSettings: {
        ...primeImageSettings,
        opacity: Number(updatedPrimeImageOpacity.toFixed(2)),
      },
    }));
  };

  updatePrimeImageFontSize = (amount) => {
    const {primeImageSettings} = this.state;

    // Update the pixel width, ensuring it is a positive integer no greater than the max font size.
    let updatedPrimeImageFontSize = primeImageSettings.fontSize + amount;
    updatedPrimeImageFontSize = Math.max(updatedPrimeImageFontSize, 1);
    updatedPrimeImageFontSize = Math.min(updatedPrimeImageFontSize, MAX_PRIME_IMAGE_FONT_SIZE);

    this.setState(({primeImageSettings}) => ({
      primeImageSettings: {
        ...primeImageSettings,
        fontSize: updatedPrimeImageFontSize,
      },
    }));
  };

  togglePrimeImageColors = () => {
    this.setState(({primeImageSettings}) => ({
      primeImageSettings: {
        ...primeImageSettings,
        isColorized: !primeImageSettings.isColorized,
      },
    }));
  };

  togglePrimeImageBorders = () => {
    this.setState(({primeImageSettings}) => ({
      primeImageSettings: {
        ...primeImageSettings,
        hasBorders: !primeImageSettings.hasBorders,
      },
    }));
  };

  render() {
    const {primeImageId, sourceImage, digitMappings, pixelatedImage, pixelDimensions} = this.props;
    const {errorMessage, primeImageRef, primeNumberString, primeImageSettings} = this.state;

    let cardsContent;
    let rightContent;
    if (errorMessage !== null) {
      // TODO: handle the error states here
      cardsContent = (
        <React.Fragment>
          <StepInstructions>
            <p>Something went wrong while generating your prime image.</p>
            <p>Head back to the previous step and try again!</p>
          </StepInstructions>
          <p>{errorMessage}</p>
        </React.Fragment>
      );
    } else if (primeNumberString === null) {
      cardsContent = (
        <React.Fragment>
          <StatsCard
            sourceImage={sourceImage}
            digitMappings={digitMappings}
            pixelatedImage={pixelatedImage}
            pixelDimensions={pixelDimensions}
          />
          <ProgressCard />
        </React.Fragment>
      );

      rightContent = (
        <RightLoadingContentWrapper>
          <CompletionNotificationCard />
          <LoadingIndicator pixelatedImage={pixelatedImage} digitMappings={digitMappings} />
        </RightLoadingContentWrapper>
      );
    } else {
      cardsContent = (
        <React.Fragment>
          <PrimeImageControlsCard
            {...primeImageSettings}
            maxFontSize={MAX_PRIME_IMAGE_FONT_SIZE}
            toggleColors={this.togglePrimeImageColors}
            toggleBorders={this.togglePrimeImageBorders}
            updateOpacity={this.updatePrimeImageOpacity}
            updateFontSize={this.updatePrimeImageFontSize}
            pixelHexValueIndexes={pixelatedImage.pixelHexValueIndexes}
          />
          <ShareCard primeImageId={primeImageId} primeImageRef={primeImageRef} />
        </React.Fragment>
      );

      rightContent = (
        <PrimeImage
          {...primeImageSettings}
          sourceImage={sourceImage}
          pixelDimensions={pixelDimensions}
          hexValues={pixelatedImage.hexValues}
          primeNumberString={primeNumberString}
          setPrimeImageRef={this.setPrimeImageRef}
          pixelHexValueIndexes={pixelatedImage.pixelHexValueIndexes}
        />
      );
    }

    return (
      <ContentWrapper>
        <CardsAndButtonWrapper>
          <CardsWrapper>{cardsContent}</CardsWrapper>
        </CardsAndButtonWrapper>
        {rightContent}
      </ContentWrapper>
    );
  }
}

Step5.propTypes = {
  // TODO: make these required?
  primeImage: PropTypes.object,
  sourceImage: PropTypes.object,
  primeImageId: PropTypes.string.isRequired,
  setPrimeImage: PropTypes.func.isRequired,
  digitMappings: PropTypes.object,
  pixelatedImage: PropTypes.object,
  pixelDimensions: PropTypes.object,
  setStateFromFirestore: PropTypes.func.isRequired,
};

export default Step5;

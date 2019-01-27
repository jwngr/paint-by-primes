import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {db, storage} from '../../loadFirebase';

import StatsCard from './StatsCard';
import ShareCard from './ShareCard';
import PrimeImage from './PrimeImage';
import ProgressCard from './ProgressCard';
import LoadingIndicator from './LoadingIndicator';
import PrimeImageControlsCard from './PrimeImageControlsCard';
import CompletionNotificationCard from './CompletionNotificationCard';

import {
  CardsWrapper,
  ErrorMessage,
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
    let {primeImage, postId, pixelatedImage, setStateFromFirestore} = this.props;

    if (primeImage !== null) {
      this.setState({
        primeNumberString: primeImage.primeNumberString,
      });
    } else if (pixelatedImage === null) {
      return db
        .doc(`primes/${postId}`)
        .get()
        .then(async (primeImageDoc) => {
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
      const primeImageDoc = await db.doc(`posts/${postId}`).get();

      if (!primeImageDoc.exists) {
        await this.savePrimeImageDataToFirebase(postId);
      }

      await this.fetchPrimeNumberString();
    }
  }

  setPrimeImageRef = (ref) => {
    this.setState({
      primeImageRef: ref,
    });
  };

  savePrimeImageDataToFirebase = async (postId) => {
    const {sourceImage, digitMappings, pixelatedImage, pixelDimensions} = this.props;

    // Stringify nested arrays since Firestore cannot handle them.
    const pixelatedImageNoNestedArray = _.clone(pixelatedImage);
    pixelatedImageNoNestedArray.pixelHexValueIndexes = JSON.stringify(
      pixelatedImageNoNestedArray.pixelHexValueIndexes
    );

    // TODO: write security rules for Firestore and Cloud Storage.
    // Save the source image to Cloud Storage.
    const storageSnap = await storage
      .ref()
      .child(`sourceImages/${postId}`)
      .put(sourceImage.fileBlob);
    const downloadUrl = await storageSnap.ref.getDownloadURL();

    // Save the prime image data to Firestore.
    return db.doc(`posts/${postId}`).set({
      sourceImage: {
        // TODO: handle fileBlob not being saved.
        fileUrl: downloadUrl,
        width: sourceImage.width,
        height: sourceImage.height,
      },
      digitMappings,
      pixelDimensions,
      pixelatedImage: pixelatedImageNoNestedArray,
    });
  };

  fetchPrimeNumberString = () => {
    const {postId, setPrimeImage, pixelatedImage, digitMappings} = this.props;

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
        postId,
        number: this.imageNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === 'object' && 'error' in data) {
          return Promise.reject(data.error);
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
        let errorMessage = error.message;
        if (errorMessage === 'Failed to fetch') {
          errorMessage =
            'The server is temporarily unavailable. Please try again in a few seconds.';
        }

        this.setState({
          errorMessage: errorMessage,
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
    const {postId, sourceImage, digitMappings, pixelatedImage, pixelDimensions} = this.props;
    const {errorMessage, primeImageRef, primeNumberString, primeImageSettings} = this.state;

    let leftContent;
    let rightContent;
    if (errorMessage !== null) {
      leftContent = (
        <React.Fragment>
          <ErrorMessage>
            Whoops... something went wrong.
            <br />
            {errorMessage}
          </ErrorMessage>
        </React.Fragment>
      );
    } else if (primeNumberString === null) {
      leftContent = (
        <CardsAndButtonWrapper>
          <CardsWrapper>
            <StatsCard
              sourceImage={sourceImage}
              digitMappings={digitMappings}
              pixelatedImage={pixelatedImage}
              pixelDimensions={pixelDimensions}
            />
            <ProgressCard />
          </CardsWrapper>
        </CardsAndButtonWrapper>
      );

      rightContent = (
        <RightLoadingContentWrapper>
          <CompletionNotificationCard />
          <LoadingIndicator pixelatedImage={pixelatedImage} digitMappings={digitMappings} />
        </RightLoadingContentWrapper>
      );
    } else {
      leftContent = (
        <CardsAndButtonWrapper>
          <CardsWrapper>
            <PrimeImageControlsCard
              {...primeImageSettings}
              maxFontSize={MAX_PRIME_IMAGE_FONT_SIZE}
              toggleColors={this.togglePrimeImageColors}
              toggleBorders={this.togglePrimeImageBorders}
              updateOpacity={this.updatePrimeImageOpacity}
              updateFontSize={this.updatePrimeImageFontSize}
              pixelHexValueIndexes={pixelatedImage.pixelHexValueIndexes}
            />
            <ShareCard postId={postId} primeImageRef={primeImageRef} />
          </CardsWrapper>
        </CardsAndButtonWrapper>
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
        {leftContent}
        {rightContent}
      </ContentWrapper>
    );
  }
}

Step5.propTypes = {
  // TODO: make these required?
  primeImage: PropTypes.object,
  sourceImage: PropTypes.object,
  postId: PropTypes.string.isRequired,
  setPrimeImage: PropTypes.func.isRequired,
  digitMappings: PropTypes.object,
  pixelatedImage: PropTypes.object,
  pixelDimensions: PropTypes.object,
  setStateFromFirestore: PropTypes.func.isRequired,
};

export default Step5;

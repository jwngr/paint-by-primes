import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {db, storage} from '../../loadFirebase';
import {fetchPrimeNumberString} from '../../lib/server';

import StatsCard from './StatsCard';
import ShareCard from './ShareCard';
import PrimeImage from './PrimeImage';
import CopyUrlCard from './CopyUrlCard';
import ProgressCard from './ProgressCard';
import LoadingIndicator from './LoadingIndicator';
import PrimeImageControlsCard from './PrimeImageControlsCard';

import {
  CardsWrapper,
  ErrorMessage,
  ContentWrapper,
  CardsAndButtonWrapper,
  RightLoadingContentWrapper,
} from './index.styles';

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
      // If the result prime number already exists locally, simply use it.
      this.setState({
        primeNumberString: primeImage.primeNumberString,
      });
    } else if (pixelatedImage !== null) {
      // Else if there is relevant state (meaning this page is being loaded from the previous step),
      // save the current state to Firestore and fetch the result number from the server.
      // TODO: this fails when you try to do this by going back and generating new image after a
      // page reload.
      await this.savePrimeImageDataToFirebase(postId);
      await this.fetchPrimeNumberString();
    } else {
      // Otherwise, look up the result in Firestore.
      try {
        const primeImageDoc = await db.doc(`posts/${postId}`).get();

        if (!primeImageDoc.exists) {
          throw new Error('Provided post ID does not exist.');
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
      } catch (error) {
        this.setState({
          errorMessage: error.message,
        });
      }
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

    return fetchPrimeNumberString(postId, this.imageNumber)
      .then((data) => {
        setPrimeImage({
          primeNumberString: data,
        });
        this.setState({
          errorMessage: null,
          primeNumberString: data,
        });
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
          <CardsWrapper smallScreenFlexDirection={'row'}>
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
          <CopyUrlCard />
          <LoadingIndicator pixelatedImage={pixelatedImage} digitMappings={digitMappings} />
        </RightLoadingContentWrapper>
      );
    } else {
      leftContent = (
        <CardsAndButtonWrapper>
          <CardsWrapper smallScreenFlexDirection={'column'}>
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

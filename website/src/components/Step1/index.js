import _ from 'lodash';
import React from 'react';
import ReactCompareImage from 'react-compare-image';

import GlobeIcon from '../svgs/GlobeIcon';
import UploadIcon from '../svgs/UploadIcon';
import PaintingIcon from '../svgs/PaintingIcon';

import pearlEarringOriginal from '../../images/pearlEarring.jpg';
import pearlEarringPrimeImage from '../../images/pearlEarringPrimeImage.jpg';

import {
  FileInput,
  ErrorMessage,
  Instructions,
  ContentWrapper,
  SubContentWrapper,
  ImageSelectionButton,
  ImageComparisonWrapper,
  ImageSelectionButtonWrapper,
  ImageSelectionButtonsWrapper,
} from './index.styles';

const RANDOM_WORKS_OF_ART_FILENAMES = [
  'americanGothic.jpg',
  'fridaKahlo.jpg',
  'greatWave.jpg',
  'monaLisa.jpg',
  'mondrian.jpg',
  'pearlEarring.jpg',
  'persistenceOfMemory.jpg',
  'starryNight.jpg',
  'theScream.jpg',
  'theSonOfMan.jpg',
  'sunflowers.jpg',
];

class Step1 extends React.Component {
  state = {
    errorMessage: null,
    errorMessageButtonIndex: null,
  };

  getSourceImageUrlFromUser = () => {
    const sourceImageUrl = prompt('Enter an image URL');

    this.selectSourceImageFromUrl(sourceImageUrl);
  };

  setSourceImageFromFileBlob = (fileBlob) => {
    return new Promise((resolve, reject) => {
      const {setSourceImage} = this.props;

      const fileUrl = URL.createObjectURL(fileBlob);

      var img = new Image();

      img.src = fileUrl;

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        setSourceImage({
          width,
          height,
          fileUrl,
          fileBlob,
        });

        resolve();
      };

      img.onerror = (event) => {
        const errorMessage = 'Failed to set source image.';
        console.error(errorMessage, event);
        reject(new Error(errorMessage));
      };
    });
  };

  setSourceImageFromFileInput = (event) => {
    return this.setSourceImageFromFileBlob(event.target.files[0]).catch(() => {
      this.setState({
        errorMessage: 'Invalid image file provided.',
        errorMessageButtonIndex: 0,
      });
    });
  };

  selectSourceImageFromUrl = (url) => {
    fetch(url)
      .then((res) => {
        return res.blob();
      })
      .then(this.setSourceImageFromFileBlob)
      .catch(() => {
        this.setState({
          errorMessage: 'Invalid image URL provided.',
          errorMessageButtonIndex: 1,
        });
      });
  };

  setSourceImageFromRandomWorksOfArt = () => {
    const workOfArtFilename = _.sample(RANDOM_WORKS_OF_ART_FILENAMES);
    this.selectSourceImageFromUrl(`/images/${workOfArtFilename}`);
  };

  render() {
    const {errorMessage, errorMessageButtonIndex} = this.state;

    let errorContent;
    if (errorMessage !== null) {
      errorContent = <ErrorMessage>{errorMessage}</ErrorMessage>;
    }

    return (
      <ContentWrapper>
        <SubContentWrapper>
          <div>
            <ImageComparisonWrapper>
              <ReactCompareImage
                leftImage={pearlEarringOriginal}
                rightImage={pearlEarringPrimeImage}
              />
              {/* TODO: cleanup... <img src={pearlEarringOriginal} alt="TODO" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 512.828 512.828"
          >
            <path
              d="M33.105,473.415L0,428.339l234.096-171.928L0,84.49l33.104-45.077l264.785,194.459
				c7.174,5.269,11.411,13.638,11.411,22.539c0,8.9-4.237,17.27-11.411,22.538L33.105,473.415z"
            />
            <path
              d="M236.635,473.415l-33.105-45.076l234.094-171.928L203.53,84.49l33.104-45.077l264.783,194.459
				c7.174,5.268,11.411,13.637,11.411,22.538c0,8.899-4.237,17.271-11.411,22.538L236.635,473.415z"
            />
          </svg>
          <img src={pearlEarringPrimeImage} alt="TODO" /> */}
            </ImageComparisonWrapper>
          </div>

          <div>
            <Instructions>Choose a source image to get started.</Instructions>

            <ImageSelectionButtonsWrapper>
              <ImageSelectionButtonWrapper>
                <FileInput
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={this.setSourceImageFromFileInput}
                  ref={(ref) => {
                    this.fileInputRef = ref;
                  }}
                />

                <ImageSelectionButton onClick={() => this.fileInputRef.click()}>
                  <UploadIcon />
                  Upload Your Own Image&hellip;
                </ImageSelectionButton>
                {errorMessageButtonIndex === 0 && errorContent}
              </ImageSelectionButtonWrapper>

              <ImageSelectionButtonWrapper>
                <ImageSelectionButton onClick={this.getSourceImageUrlFromUser}>
                  <GlobeIcon />
                  Enter Image URL&hellip;
                </ImageSelectionButton>
                {errorMessageButtonIndex === 1 && errorContent}
              </ImageSelectionButtonWrapper>

              <ImageSelectionButtonWrapper>
                <ImageSelectionButton onClick={this.setSourceImageFromRandomWorksOfArt}>
                  <PaintingIcon />
                  Use Random Work Of Art&hellip;
                </ImageSelectionButton>
              </ImageSelectionButtonWrapper>
            </ImageSelectionButtonsWrapper>
          </div>
        </SubContentWrapper>
      </ContentWrapper>
    );
  }
}

export default Step1;

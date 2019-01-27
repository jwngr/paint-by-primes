import React from 'react';
import html2canvas from 'html2canvas';

import {storage} from '../../../loadFirebase';
import CopyIcon from '../../svgs/CopyIcon';
import TwitterBird from '../../svgs/TwitterBird';
import DownloadIcon from '../../svgs/DownloadIcon';
import CardFooter from '../../Card/CardFooter';
import {CardBody, CardInstruction} from '../../Card';

import firebaseConfig from '../../../loadConfig';
import {copyToClipboard} from '../../../lib/utils';
import {colors} from '../../../resources/theme.json';

import {ShareButton, ShareCardWrapper} from './index.styles';

class ShareCard extends React.PureComponent {
  state = {
    footer: null,
  };

  componentWillUnmount() {
    clearTimeout(this.footerResetTimeout);
  }

  getPrimeImageCanvas = () => {
    const {primeImageRef} = this.props;

    return html2canvas(primeImageRef, {
      logging: false,
      backgroundColor: null,
    }).catch((error) => {
      // TODO: handle error message
      // eslint-disable-next-line
      console.error('html2canvas failed: ', error);
    });
  };

  downloadPrimeImage = () => {
    clearTimeout(this.footerResetTimeout);

    this.setState({
      footer: <CardFooter type="info" text="Generating image..." color={colors.orange.medium} />,
    });

    const {postId} = this.props;

    if (window.screen.width <= 768) {
      // For tablets and phones, upload the image to Cloud Storage and open it in a new tab.
      return this.savePrimeImageToCloudStorage()
        .then((downloadUrl) => {
          window.open(downloadUrl, '_blank');

          this.setState({
            footer: (
              <CardFooter
                type="success"
                text="Image opened in new tab!"
                color={colors.green.medium}
              />
            ),
          });

          this.setFooterResetTimeout();
        })
        .catch((error) => {
          const errorMessage = `Failed to open image in a new tab: ${error.message}`;

          console.error(errorMessage);

          this.setState({
            footer: <CardFooter type="error" text={errorMessage} color={colors.red.medium} />,
          });
        });
    } else {
      // For desktops, download the image to the local file system
      return this.getPrimeImageCanvas()
        .then((canvas) => {
          // Download the file to the user's local computer.
          var link = document.createElement('a');
          link.download = `primeImage-${postId}.jpg`;
          link.href = canvas.toDataURL('image/jpg');
          link.click();

          this.setState({
            footer: (
              <CardFooter
                type="success"
                text="Image generated and downloaded!"
                color={colors.green.medium}
              />
            ),
          });

          this.setFooterResetTimeout();
        })
        .catch((error) => {
          const errorMessage = `Failed to generate and download image: ${error.message}`;

          console.error(errorMessage);

          this.setState({
            footer: <CardFooter type="error" text={errorMessage} color={colors.red.medium} />,
          });
        });
    }
  };

  savePrimeImageToCloudStorage = async (timestamp = Date.now()) => {
    const canvas = await this.getPrimeImageCanvas();
    const dataUrl = canvas.toDataURL('image/jpg');

    const {postId} = this.props;

    // TODO: write security rules for Firestore and Cloud Storage.
    // Save the source image to Cloud Storage.
    const storageSnap = await storage
      .ref()
      .child(`primes/${postId}/${timestamp}.jpg`)
      .putString(dataUrl, 'data_url');
    const downloadUrl = await storageSnap.ref.getDownloadURL();

    return downloadUrl;
  };

  openTwitterIntent = () => {
    clearTimeout(this.footerResetTimeout);

    this.setState({
      footer: (
        <CardFooter type="info" text="Generating tweet contents..." color={colors.orange.medium} />
      ),
    });

    return this.savePrimeImageToCloudStorage()
      .then((downloadUrl) => {
        const tweetUrl = window.location.href;
        const tweetText = `Paint By Primes created a prime number which looks like my image!`;

        const twitterItentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}&url=${encodeURIComponent(downloadUrl)}&via=_jwngr`;

        window.open(twitterItentUrl, '_blank');

        this.setState({
          footer: <CardFooter type="success" text="Tweet generated!" color={colors.green.medium} />,
        });

        this.setFooterResetTimeout();
      })
      .catch((error) => {
        const errorMessage = `Failed to generate tweet content: ${error.message}`;

        console.error(errorMessage);

        this.setState({
          footer: <CardFooter type="error" text={errorMessage} color={colors.red.medium} />,
        });
      });
  };

  copyImageUrlToClipboard = async () => {
    const {postId} = this.props;

    clearTimeout(this.footerResetTimeout);

    this.setState({
      footer: (
        <CardFooter type="info" text="Generating image URL..." color={colors.orange.medium} />
      ),
    });

    try {
      const timestamp = Date.now();

      const primeImageUrl = `https://firebasestorage.googleapis.com/v0/b/${
        firebaseConfig.projectId
      }.appspot.com/o/primes%2F${postId}%2F${timestamp}.jpg?alt=media`;

      this.savePrimeImageToCloudStorage(timestamp);

      copyToClipboard(primeImageUrl);

      this.setState({
        footer: (
          <CardFooter
            type="success"
            text="Image URL copied to clipboard!"
            color={colors.green.medium}
          />
        ),
      });

      this.setFooterResetTimeout();
    } catch (error) {
      const errorMessage = `Failed to copy image URL to clipboard: ${error.message}`;

      console.error(errorMessage);

      this.setState({
        footer: <CardFooter type="error" text={errorMessage} color={colors.red.medium} />,
      });
    }
  };

  setFooterResetTimeout = () => {
    clearTimeout(this.footerResetTimeout);

    this.footerResetTimeout = setTimeout(() => {
      this.setState({
        footer: null,
      });
    }, 4000);
  };

  render() {
    // TODO: update this before launch.

    const {footer} = this.state;

    return (
      <ShareCardWrapper>
        <CardInstruction>Share your prime image.</CardInstruction>
        <CardBody>
          <ShareButton onClick={this.openTwitterIntent}>
            <TwitterBird />
            Tweet
          </ShareButton>
          <ShareButton onClick={this.downloadPrimeImage}>
            <DownloadIcon />
            Download
          </ShareButton>
          <ShareButton onClick={this.copyImageUrlToClipboard}>
            <CopyIcon />
            Copy URL
          </ShareButton>
        </CardBody>
        {footer}
      </ShareCardWrapper>
    );
  }
}

export default ShareCard;

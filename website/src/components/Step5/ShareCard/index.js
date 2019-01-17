import React from 'react';
import html2canvas from 'html2canvas';

import Button from '../../Button';
import {storage} from '../../../loadFirebase';
import {CardBody, CardInstruction} from '../../Card';

import {ShareCardWrapper} from './index.styles';

class ShareCard extends React.PureComponent {
  getPrimeImageCanvas = () => {
    const {primeImageRef} = this.props;

    return html2canvas(primeImageRef).catch((error) => {
      // TODO: handle error message
      // eslint-disable-next-line
      console.error('html2canvas failed: ', error);
    });
  };

  downloadPrimeImage = () => {
    const {primeImageId} = this.props;

    return this.getPrimeImageCanvas()
      .then((canvas) => {
        // Download the file to the user's local computer.
        var link = document.createElement('a');
        link.download = `primeImage-${primeImageId}.jpg`;
        link.href = canvas.toDataURL('image/jpg');
        link.click();
      })
      .catch((error) => {
        // TODO: handle error message
        // eslint-disable-next-line
        console.error('Download prime image failed: ', error);
      });
  };

  savePrimeImageToCloudStorage = async (dataUrl) => {
    if (!dataUrl) {
      const canvas = await this.getPrimeImageCanvas();
      dataUrl = canvas.toDataURL('image/jpg');
    }

    const {primeImageId} = this.props;

    // TODO: handle errors

    // TODO: write security rules for Firestore and Cloud Storage.
    // Save the source image to Cloud Storage.
    const storageSnap = await storage
      .ref()
      .child(`primeImages/${primeImageId}.jpg`)
      .putString(dataUrl, 'data_url');
    const downloadUrl = await storageSnap.ref.getDownloadURL();

    // TODO: delete this
    console.log('DOWNLOAD URL:', downloadUrl);

    return downloadUrl;
  };

  openInZazzle = () => {
    return this.savePrimeImageToCloudStorage()
      .then((downloadUrl) => {
        const zazzleUrl = `https://www.zazzle.com/api/create/at-238509927142515907?rf=238509927142515907&ax=linkover&pd=228969044254082258&ed=true&t_primeimage_iid=${encodeURIComponent(
          downloadUrl
        )}`;
        window.open(zazzleUrl, '_blank');
      })
      .catch((error) => {
        // TODO: handle error message
        // eslint-disable-next-line
        console.error('Open in Zazzle failed: ', error);
      });
  };

  render() {
    // TODO: update this before launch.
    const tweetText = `Turn any image into a prime image. See my creation!`;
    const tweetUrl = window.location.href;

    return (
      <ShareCardWrapper>
        <CardInstruction>Share your prime image.</CardInstruction>
        <CardBody>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}&url=${encodeURIComponent(tweetUrl)}&via=_jwngr`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </a>
          <Button onClick={this.downloadPrimeImage}>Download</Button>
          <Button onClick={this.openInZazzle}>Zazzle</Button>
          {/* <a
            href={`https://www.zazzle.com/api/create/at-238509927142515907?rf=238509927142515907&ax=linkover&pd=228969044254082258&ed=true&t_primeimage_iid=${encodeURIComponent(
              // 'https://firebasestorage.googleapis.com/v0/b/prime-images-dev.appspot.com/o/primeImages%2F13e63c18-5a13-4421-9328-2c4dff3a120e?alt=media&token=2031c15b-0be0-4d6f-a570-cf6bf5cda32a'
              'https://images.unsplash.com/photo-1504937551116-cb8097e6f02a'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zazzle
          </a> */}
        </CardBody>
      </ShareCardWrapper>
    );
  }
}

export default ShareCard;

import React from 'react';
import html2canvas from 'html2canvas';

import Button from '../../Button';
import {storage} from '../../../loadFirebase';
import {CardBody, CardInstruction} from '../../Card';

import {ShareCardWrapper} from './index.styles';

class ShareCard extends React.PureComponent {
  downloadPrimeImage = () => {
    const {primeImageId, primeImageRef} = this.props;

    return html2canvas(primeImageRef)
      .then((canvas) => {
        var link = document.createElement('a');
        link.download = `primeImage-${primeImageId}.jpg`;
        link.href = canvas.toDataURL('image/jpg');
        link.click();

        this.savePrimeImageToCloudStorage(link.href);
      })
      .catch((error) => {
        // TODO: handle error message
        // eslint-disable-next-line
        console.error('html2canvas failed: ', error);
      });
  };

  savePrimeImageToCloudStorage = async (dataUrl) => {
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
          <a
            href={`https://www.zazzle.com/api/create/at-238509927142515907?rf=238509927142515907&ax=Linkover&pd=228969044254082258&ed=true&tc=&ic=&t_primeimage_iid=${encodeURIComponent(
              // 'https://firebasestorage.googleapis.com/v0/b/prime-images-dev.appspot.com/o/primeImages%2F13e63c18-5a13-4421-9328-2c4dff3a120e?alt=media&token=2031c15b-0be0-4d6f-a570-cf6bf5cda32a'
              'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zazzle
          </a>
        </CardBody>
      </ShareCardWrapper>
    );
  }
}

export default ShareCard;

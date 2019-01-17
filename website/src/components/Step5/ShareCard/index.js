import React from 'react';
import domToImage from 'dom-to-image';

import Button from '../../Button';
import {storage} from '../../../loadFirebase';
import {CardBody, CardInstruction} from '../../Card';

import {ShareCardWrapper} from './index.styles';

class ShareCard extends React.PureComponent {
  saveImage = () => {
    const {primeImageId, primeImageRef} = this.props;

    // var node = document.getElementById('prime-image');

    console.log('node:', primeImageRef);

    domToImage
      .toJpeg(primeImageRef, {
        quality: 1,
        // TODO: make sure this is the background color
        bgcolor: '#eef7d9',
        width: 10000,
        height: 10000,
      })
      .then(async (dataUrl) => {
        console.log('Success:', dataUrl);
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);

        // TODO: write security rules for Firestore and Cloud Storage.
        // Save the source image to Cloud Storage.
        const storageSnap = await storage
          .ref()
          .child(`primeImages/${primeImageId}`)
          .putString(dataUrl.replace('data:image/jpeg;base64,', ''));
        const downloadUrl = await storageSnap.ref.getDownloadURL();

        console.log('downloadUrl:', downloadUrl);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
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
          <Button onClick={this.saveImage}>Download</Button>
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

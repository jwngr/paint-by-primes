import React from 'react';

import CardFooter from '../../Card/CardFooter';
import {CardBody, CardInstruction} from '../../Card';

import {copyToClipboard} from '../../../lib/utils';
import {colors} from '../../../resources/theme.json';

import {Url, CopyUrlCardWrapper} from './index.styles';

class CopyUrlCard extends React.PureComponent {
  state = {
    showFooter: false,
  };

  copyUrlToClipboard = () => {
    this.setState({
      showFooter: true,
    });

    setTimeout(() => {
      this.setState({
        showFooter: false,
      });
    }, 2000);

    copyToClipboard(window.location.href);
  };

  render() {
    const {showFooter} = this.state;

    return (
      <CopyUrlCardWrapper>
        <CardInstruction>
          Keep this page open, or save this URL and come back later to see your image:
        </CardInstruction>
        <CardBody>
          <Url onClick={this.copyUrlToClipboard}>{window.location.href}</Url>
        </CardBody>
        {showFooter && (
          <CardFooter
            type="success"
            text="URL successfully copied to clipboard!"
            color={colors.green.medium}
          />
        )}
      </CopyUrlCardWrapper>
    );
  }
}

export default CopyUrlCard;

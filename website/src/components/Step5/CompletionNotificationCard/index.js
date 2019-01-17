import React from 'react';

import Button from '../../Button';
import {CardBody, CardInstruction} from '../../Card';

import {CompletionNotificationCardWrapper} from './index.styles';

import {copyToClipboard} from '../../../lib/utils';

class CompletionNotificationCard extends React.PureComponent {
  render() {
    return (
      <CompletionNotificationCardWrapper>
        <CardInstruction>
          Keep this page open, or save this URL and come back later to see your prime image.
        </CardInstruction>
        <CardBody>
          <Button
            onClick={() => {
              copyToClipboard(window.location.href);
            }}
          >
            Copy URL To Clipboard
          </Button>
        </CardBody>
      </CompletionNotificationCardWrapper>
    );
  }
}

export default CompletionNotificationCard;

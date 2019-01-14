import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import {CardBody, CardInstruction} from '../../Card';

import {ColorizationControlCardWrapper} from './index.styles';

class ColorizationControlCard extends React.PureComponent {
  render() {
    const {toggleDigitImageColors} = this.props;

    return (
      <ColorizationControlCardWrapper>
        <CardInstruction>
          Use the toggle below to see how the image looks with and without colors.
        </CardInstruction>
        <CardBody>
          <Button onClick={toggleDigitImageColors}>Toggle Colors</Button>
        </CardBody>
      </ColorizationControlCardWrapper>
    );
  }
}

ColorizationControlCard.propTypes = {
  toggleDigitImageColors: PropTypes.func.isRequired,
};

export default ColorizationControlCard;

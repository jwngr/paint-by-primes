import React from 'react';
import PropTypes from 'prop-types';

import {CardBody, CardInstruction} from '../../Card';
import CardToggleSection from '../../Card/CardToggleSection';

import {ColorizationControlCardWrapper} from './index.styles';

class ColorizationControlCard extends React.PureComponent {
  render() {
    const {toggleDigitImageColors, isDigitImageColorized} = this.props;

    return (
      <ColorizationControlCardWrapper>
        <CardInstruction>
          Use the toggle below to see how the image looks with and without colors.
        </CardInstruction>
        <CardBody>
          <CardToggleSection
            title="Colors"
            onToggle={toggleDigitImageColors}
            isChecked={isDigitImageColorized}
          />
        </CardBody>
      </ColorizationControlCardWrapper>
    );
  }
}

ColorizationControlCard.propTypes = {
  isDigitImageColorized: PropTypes.bool.isRequired,
  toggleDigitImageColors: PropTypes.func.isRequired,
};

export default ColorizationControlCard;

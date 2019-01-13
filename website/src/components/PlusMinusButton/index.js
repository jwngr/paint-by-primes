import React from 'react';
import PropTypes from 'prop-types';

import Plus from '../svgs/Plus';
import Minus from '../svgs/Minus';

import {
  GooBlob,
  GooBlobContainer,
  PlusMinusButtonIcon,
  PlusMinusButtonWrapper,
} from './index.styles';

const createPlusMinusButton = (plusOrMinus) => {
  return ({onClick, isHidden}) => {
    return (
      <PlusMinusButtonWrapper onClick={onClick} isHidden={isHidden}>
        <PlusMinusButtonIcon>
          {plusOrMinus === 'plus' ? <Plus style={{zIndex: 10}} /> : <Minus style={{zIndex: 10}} />}
        </PlusMinusButtonIcon>
        <GooBlobContainer>
          <GooBlob />
          <GooBlob />
          <GooBlob />
        </GooBlobContainer>
      </PlusMinusButtonWrapper>
    );
  };
};

const plusMinusButtonPropTypes = {
  hidden: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const PlusButton = createPlusMinusButton('plus');
PlusButton.propTypes = plusMinusButtonPropTypes;

const MinusButton = createPlusMinusButton('minus');
PlusButton.propTypes = plusMinusButtonPropTypes;

export {PlusButton, MinusButton};

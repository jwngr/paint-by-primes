import React from 'react';

import Plus from '../svgs/Plus';
import Minus from '../svgs/Minus';

import {
  GooBlob,
  GooBlobContainer,
  PlusMinusButtonIcon,
  PlusMinusButtonWrapper,
} from './index.styles';

export default ({onClick, plusOrMinus}) => {
  return (
    <PlusMinusButtonWrapper onClick={onClick}>
      <PlusMinusButtonIcon>
        {plusOrMinus === 'plus' ? <Plus style={{zIndex: 100}} /> : <Minus style={{zIndex: 100}} />}
      </PlusMinusButtonIcon>
      <GooBlobContainer>
        <GooBlob />
        <GooBlob />
        <GooBlob />
      </GooBlobContainer>
    </PlusMinusButtonWrapper>
  );
};

import React from 'react';
import PropTypes from 'prop-types';

import {GooBlob, GooeyButton, GooBlobContainer, ButtonChildrenWrapper} from './index.styles';

const Button = ({children, onClick, isDisabled, className}) => {
  return (
    <GooeyButton className={className} disabled={isDisabled} onClick={onClick}>
      <ButtonChildrenWrapper>{children}</ButtonChildrenWrapper>
      <GooBlobContainer>
        <GooBlob />
        <GooBlob />
        <GooBlob />
        <GooBlob />
      </GooBlobContainer>
    </GooeyButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';

import {GooBlob, GooeyButton, GooBlobContainer} from './index.styles';

const Button = ({children, onClick, isDisabled}) => {
  return (
    <GooeyButton disabled={isDisabled} onClick={onClick}>
      {children}
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

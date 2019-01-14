import React from 'react';
import PropTypes from 'prop-types';

import {GooBlob, GooeyButton, GooBlobContainer} from './index.styles';

const Button = ({children, onClick, disabled}) => {
  return (
    <GooeyButton disabled={disabled} onClick={onClick}>
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
  disable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;

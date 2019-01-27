import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../svgs/Info';
import Warning from '../../svgs/Warning';
import ThinCheckmark from '../../svgs/ThinCheckmark';

import {CardFooterIcon, CardFooterText, CardFooterWrapper} from './index.styles';

const CardFooter = ({text, type, color}) => {
  // TODO: make new icons.
  let icon;
  if (type === 'info') {
    icon = <Info />;
  } else if (type === 'error') {
    icon = <Warning />;
  } else if (type === 'success') {
    icon = <ThinCheckmark />;
  }

  return (
    <CardFooterWrapper>
      <CardFooterIcon color={color}>{icon}</CardFooterIcon>
      <CardFooterText>{text}</CardFooterText>
    </CardFooterWrapper>
  );
};

CardFooter.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.oneOf(['info', 'error', 'success']).isRequired,
};

export default CardFooter;

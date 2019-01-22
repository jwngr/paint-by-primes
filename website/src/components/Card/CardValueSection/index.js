import React from 'react';
import PropTypes from 'prop-types';

import {CardBodySection} from '../';

import {Value} from './index.styles';

const CardValueSection = ({title, value, color}) => {
  return (
    <CardBodySection title={title}>
      <Value style={{color}}>{value}</Value>
    </CardBodySection>
  );
};

CardValueSection.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node]).isRequired,
};

export default CardValueSection;

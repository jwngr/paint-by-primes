import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {SmallCapsHeader} from '../index.styles';

const CardWrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.gray.lightest};
  border-radius: 10px;
  box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.2);

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const CardInstruction = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({theme}) => theme.colors.blue.darker};
`;

const CardBodySectionWrapper = styled.div`
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CardBodySectionInternal = ({title, children}) => {
  return (
    <CardBodySectionWrapper>
      <SmallCapsHeader>{title.toUpperCase()}</SmallCapsHeader>
      {children}
    </CardBodySectionWrapper>
  );
};
CardBodySectionInternal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export const CardBodySection = CardBodySectionInternal;

export const CardBody = styled.div``;

const Card = ({children, className}) => <CardWrapper className={className}>{children}</CardWrapper>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default Card;

import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.gray.lightest};
  border-radius: 10px;
  box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.2);
`;

export const CardInstruction = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({theme}) => theme.colors.blue.medium};
`;

export const CardBody = styled.div``;

export default ({children, className}) => (
  <CardWrapper className={className}>{children}</CardWrapper>
);

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 28px;
  color: ${({theme}) => theme.colors.blue.darker};

  p:first-of-type {
    font-weight: bold;
  }
`;

export default ({children}) => <Wrapper>{children}</Wrapper>;

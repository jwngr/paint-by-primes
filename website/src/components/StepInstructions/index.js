import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 28px;
  color: ${(props) => props.theme.colors.blue.medium};

  p:first-of-type {
    font-weight: bold;
  }
`;

export default ({children}) => <Wrapper>{children}</Wrapper>;

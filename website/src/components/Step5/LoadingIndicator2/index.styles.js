import styled from 'styled-components';

import {getHsp} from '../../../lib/utils';

export const LoadingIndicatorWrapper = styled.div`
  display: grid;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};
  grid-template-rows: repeat(10, 32px);
  grid-template-columns: repeat(10, 32px);
`;

export const LoadingIndicatorCell = styled.p`
  background-color: ${({theme}) => theme.colors.blue.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({hexValue}) => hexValue};
  color: ${({theme, hexValue}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
`;

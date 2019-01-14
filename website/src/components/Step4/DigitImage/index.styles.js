import styled from 'styled-components';

import {getHsp} from '../../../lib/utils';

export const DigitImageWrapper = styled.div`
  display: grid;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);
`;

export const Cell = styled.div`
  opacity: 0.5;
  font-size: 72%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme, hexValue, isColorized}) => {
    if (isColorized) {
      const hsp = getHsp(hexValue);
      return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
    } else {
      return theme.colors.gray.darkest;
    }
  }};
  background-color: ${({hexValue, isColorized}) => (isColorized ? hexValue : 'transparent')};
`;

import styled from 'styled-components';

import {getHsp} from '../../../lib/utils';

import {IMAGE_BORDER_WIDTH_PX} from '../../../resources/constants';

export const PrimeImageWrapper = styled.div`
  display: grid;
  max-width: 100%;
  border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};
  grid-gap: ${({hasBorders}) => {
    if (hasBorders) {
      return '1px';
    } else {
      return '0';
    }
  }};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);
`;

export const PrimeImageCell = styled.div`
  display: flex;
  opacity: ${({opacity}) => opacity};
  font-size: ${({fontSize}) => `${fontSize}px`};
  align-items: center;
  justify-content: center;
  background-color: ${({hexValue}) => hexValue};
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

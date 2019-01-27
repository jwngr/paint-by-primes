import styled from 'styled-components';

import {getHsp} from '../../../lib/utils';

import {IMAGE_BORDER_WIDTH_PX} from '../../../resources/constants';

export const PrimeImageWrapper = styled.div`
  order: 2;
  display: grid;
  margin-top: 0;
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

  @media (max-width: 1200px) {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 12px;
  }
`;

export const PrimeImageCell = styled.div.attrs(
  ({theme, hexValue, opacity, fontSize, isColorized}) => {
    let color = theme.colors.gray.darkest;
    if (isColorized) {
      const hsp = getHsp(hexValue);
      color = hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
    }

    return {
      style: {
        color,
        opacity,
        fontSize: `${fontSize}px`,
        backgroundColor: isColorized ? hexValue : 'transparent',
      },
    };
  }
)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

import styled from 'styled-components';

import {getHsp} from '../../../lib/utils';

import {IMAGE_BORDER_WIDTH_PX} from '../../../resources/constants';

export const DigitImageWrapper = styled.div`
  order: 2;
  display: grid;
  max-width: 100%;
  border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);

  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 12px;
  }
`;

export const Cell = styled.div.attrs(({theme, hexValue, isColorized}) => {
  let color = theme.colors.gray.darkest;
  if (isColorized) {
    const hsp = getHsp(hexValue);
    color = hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }

  return {
    style: {
      color,
      backgroundColor: isColorized ? hexValue : 'transparent',
    },
  };
})`
  opacity: 0.5;
  font-size: 72%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 6px;
  }
`;

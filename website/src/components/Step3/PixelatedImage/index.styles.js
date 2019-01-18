import styled from 'styled-components';

import pencilIcon from '../../../images/pencil.png';

import {IMAGE_BORDER_WIDTH_PX} from '../../../resources/constants';

export const PixelatedImageWrapper = styled.div`
  margin: 0;
  display: grid;
  /* TODO: include grid gap? */
  /* grid-gap: 1px; */
  cursor: url(${pencilIcon}), crosshair;
  background-color: ${({theme}) => theme.colors.gray.darkest}60;
  border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);

  @media (max-width: 1200px) {
    margin: auto;
  }
`;

export const CellWrapper = styled.div`
  position: relative;
  background-color: ${({theme}) => theme.colors.gray.lightest};
`;

export const Cell = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({hasReducedOpacity}) => (hasReducedOpacity ? 0.2 : 0.5)};
  background-color: ${({hexValue}) => hexValue};

  &:hover {
    background-color: ${({hoverHexValue}) => hoverHexValue};
    /* TODO: Improve box shadow */
    box-shadow: inset 0 0 1px #000000;
  }
`;

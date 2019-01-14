import styled from 'styled-components';

import pencilIcon from '../../../images/pencil.png';

export const PixelatedImageWrapper = styled.div`
  display: grid;
  grid-gap: 1px;
  cursor: url(${pencilIcon}), crosshair;
  background-color: ${({theme}) => theme.colors.gray.darkest}60;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);
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
  }
`;

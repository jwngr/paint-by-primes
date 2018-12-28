import {darken} from 'polished';
import styled from 'styled-components';

import pencilIcon from '../../images/pencil.png';

export const PixelatedImageEditorWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  color: ${({theme}) => theme.colors.blue.medium};
`;

export const PixelatedImageEditorCellWrapper = styled.div`
  position: relative;
  background-color: ${({theme}) => theme.colors.white};
`;

export const PixelatedImageEditorCell = styled.div`
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

export const PixelatedImage = styled.div`
  display: grid;
  grid-gap: 1px;
  cursor: url(${pencilIcon}), crosshair;
  background-color: ${({theme}) => theme.colors.gray.darkest}60;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);
`;

export const SubInstruction = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const Footnote = styled.p`
  font-size: 14px;
  color: ${({theme}) => theme.colors.gray.medium};
  margin: 8px 0 32px 0;
`;

export const Asterisk = styled.span`
  color: ${({color}) => color};
`;

export const SwatchesWrapper = styled.div`
  width: 360px;
  margin-right: 28px;
`;

export const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const SwatchWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Swatch = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin: 12px;
  user-select: none;
  position: relative;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
`;

export const PenColorSwatchesWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: center;
`;

export const PenColorSwatch = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin: 4px;
  user-select: none;
  position: relative;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const ColorPicker = styled.div`
  z-index: 10;
  opacity: 1;
  position: absolute;
  top: 40px;
`;

export const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

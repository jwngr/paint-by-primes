import {darken} from 'polished';
import styled from 'styled-components';

import {getHsp} from '../../lib/utils';

import Card from '../Card';

import pencilIcon from '../../images/pencil.png';

export const PixelatedImageEditorWrapper = styled.div`
  display: flex;
  max-width: 100%;
  align-items: center;
  flex-direction: row;
  color: ${({theme}) => theme.colors.blue.medium};

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const PixelatedImageEditorCellWrapper = styled.div`
  position: relative;
  background-color: ${({theme}) => theme.colors.gray.lightest};
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

export const Footnote = styled.p`
  font-size: 14px;
  margin-top: 8px;
  color: ${({theme}) => theme.colors.gray.medium};
`;

export const Asterisk = styled.span`
  color: ${({color}) => color};
`;

export const ControlsAndButtonWrapper = styled.div`
  display: flex;
  max-width: 220px;
  margin-right: 40px;
  flex-direction: column;

  @media (max-width: 1200px) {
    max-width: 100%;
    margin-right: 0;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1200px) {
    max-width: 100%;
    margin-right: 0;
    flex-direction: row;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const SwatchColorsCard = styled(Card)`
  flex: 1;
  max-width: 528px;
  margin-right: 0;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-right: 20px;
    margin-bottom: 0;
  }

  @media (max-width: 800px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const PixelColorsCard = styled(Card)`
  width: 220px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-bottom: 0;
  }

  @media (max-width: 800px) {
    flex: 1;
    width: inherit;
    margin-bottom: 20px;
  }
`;

export const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const SwatchWrapper = styled.div`
  width: 50%;
  margin: 8px 0;
  display: flex;
  align-items: center;
  flex-direction: row;

  p {
    font-size: 14px;

    &::before {
      content: '\xD7';
      margin: 0 4px 0 8px;
    }
  }

  @media (max-width: 1200px) {
    width: 100px;
  }
`;

export const EmptySwatchWrapper = styled.div`
  width: 50%;

  @media (max-width: 1200px) {
    width: 100px;
  }
`;

export const Swatch = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  user-select: none;
  position: relative;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
`;

export const PenColorSwatchesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const PenColorSwatchWrapper = styled.div`
  margin-top: 8px;
  margin-right: 4px;
`;

export const EmptyPenColorSwatchWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 4px;
`;

export const PenColorSwatch = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  user-select: none;
  position: relative;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
`;

export const PencilIcon = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: ${({theme, hexValue}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
  transform: rotate(90deg);
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

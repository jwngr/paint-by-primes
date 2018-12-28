import styled from 'styled-components';

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
    border: solid 2px ${({theme}) => theme.colors.peach.darker};
    z-index: 100;
    opacity: 1;
  }
`;

export const PixelatedImage = styled.div`
  display: grid;
  grid-gap: 1px;
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
`;

export const ColorPicker = styled.div`
  z-index: 10;
  opacity: 1;
  position: absolute;
  top: 40px;
`;

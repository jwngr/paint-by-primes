import styled from 'styled-components';

export const DigitImageEditorWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  color: ${({theme}) => theme.colors.blue.medium};
`;

export const PixelatedImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DigitImageEditorCell = styled.div`
  opacity: 0.5;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({hexValue}) => hexValue};
`;

export const PixelatedImage = styled.div`
  display: grid;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);

  ${DigitImageEditorCell} {
    background-color: ${({isColorized}) => (isColorized ? 'normal' : 'transparent')};
  }
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
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Swatch = styled.div`
  width: 40px;
  height: 40px;
  margin: 12px;
  position: relative;

  input {
    user-select: none;
    width: 100%;
    height: 100%;
    font-size: 24px;
    text-align: center;
  }
`;

export const Asterisk = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
`;

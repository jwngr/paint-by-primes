import styled from 'styled-components';

export const PrimeImageWrapper = styled.div`
  display: grid;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};
  grid-template-rows: repeat(${({numRows, cellHeight}) => `${numRows}, ${cellHeight}`}px);
  grid-template-columns: repeat(${({numColumns, cellWidth}) => `${numColumns}, ${cellWidth}`}px);
`;

export const PrimeImageCell = styled.div`
  opacity: 0.5;
  display: flex;
  font-size: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({hexValue}) => hexValue};
`;

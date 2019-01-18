import styled from 'styled-components';

export const LoadingIndicatorWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 32px);
  grid-template-columns: repeat(3, minmax(32px, 1fr));
  grid-row-gap: 8px;
  grid-column-gap: 8px;
`;

export const LoadingIndicatorCell = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.blue.darker};
`;

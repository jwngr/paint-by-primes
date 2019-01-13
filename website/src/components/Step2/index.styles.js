import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 100%;
  align-items: start;
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const CardsAndButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  margin-right: 40px;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    flex-direction: row;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

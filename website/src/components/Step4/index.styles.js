import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 100%;
  align-items: start;
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    margin: 0 12px;
  }
`;

export const CardsAndButtonWrapper = styled.div`
  order: 1;
  display: flex;
  width: 220px;
  margin-right: 40px;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
  }

  @media (max-width: 768px) {
    order: 2;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1200px) {
    max-width: 100%;
    margin-right: 0;
    flex-direction: row;
  }
`;

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
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1200px) {
    max-width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: ${({smallScreenFlexDirection}) => smallScreenFlexDirection};
    align-items: ${({smallScreenFlexDirection}) =>
      smallScreenFlexDirection === 'row' ? 'flex-start' : 'center'};
    justify-content: ${({smallScreenFlexDirection}) =>
      smallScreenFlexDirection === 'row' ? 'center' : 'flex-start'};
  }
`;

export const RightLoadingContentWrapper = styled.div`
  order: 2;
  display: flex;
  width: 334px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const Message = styled.p`
  margin: auto;
  font-size: 20px;
  max-width: 520px;
  line-height: 1.5;
  text-align: center;
  color: ${({theme}) => theme.colors.blue.darker};
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ErrorMessage = styled(Message)`
  color: ${({theme}) => theme.colors.red.darker};
`;

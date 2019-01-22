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
  align-items: flex-start;

  @media (max-width: 1200px) {
    max-width: 100%;
    margin-right: 0;
    flex-direction: row;
  }

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const RightLoadingContentWrapper = styled.div`
  display: flex;
  width: 334px;
  align-items: center;
  flex-direction: column;
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

import styled from 'styled-components';

export const StepperControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StepperValue = styled.p`
  font-size: 36px;
  margin: 0 8px;
  min-width: 48px;
  text-align: center;
  color: ${({theme}) => theme.colors.blue.darker};

  @media (max-width: 768px) {
    font-size: 32px;
    min-width: 40px;
  }
`;

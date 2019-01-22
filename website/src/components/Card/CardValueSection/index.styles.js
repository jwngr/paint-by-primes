import styled from 'styled-components';

export const Value = styled.div`
  color: ${({theme}) => theme.colors.blue.darker};
  font-size: 36px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

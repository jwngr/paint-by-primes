import styled from 'styled-components';

export const SmallCapsHeader = styled.p`
  color: ${({theme}) => theme.colors.blue.medium};
  font-size: 12px;
  margin-bottom: 4px;
  text-align: center;
  letter-spacing: 1.4px;
  font-variant: small-caps;
`;

import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoInner = styled.div`
  text-align: center;
  font-size: ${({fontSize}) => fontSize};
  font-family: 'Roboto Mono', monospace;
  background-color: ${({theme}) => theme.colors.blue.medium};
  display: inline-block;
  color: ${({theme}) => theme.colors.blue.darkest};
  padding: 12px 20px;
  font-weight: bold;
  border-radius: 4px;
`;

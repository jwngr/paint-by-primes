import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoInner = styled.div`
  text-align: center;
  font-size: ${(props) => props.fontSize};
  font-family: 'Roboto Mono', monospace;
  background-color: ${(props) => props.theme.colors.blue.medium};
  display: inline-block;
  color: ${(props) => props.theme.colors.white};
  padding: 12px 20px;
  font-weight: bold;
  border-radius: 4px;
`;

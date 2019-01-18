import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    border: solid ${({borderWidth}) => borderWidth}px ${({theme}) => theme.colors.blue.darker};
  }
`;

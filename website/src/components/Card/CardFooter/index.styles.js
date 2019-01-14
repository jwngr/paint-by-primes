import styled from 'styled-components';

export const CardFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.gray.medium};

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    fill: ${({theme}) => theme.colors.gray.medium};
    stroke: ${({theme}) => theme.colors.gray.medium};
  }

  @media (max-width: 1200px) {
    flex: 1;
    margin-top: 0;
    max-width: 200px;
  }
`;

export const CardFooterIcon = styled.div`
  svg {
    fill: ${({color, theme}) => color || theme.colors.gray.medium};
    stroke: ${({color, theme}) => color || theme.colors.gray.medium};
  }
`;

export const CardFooterText = styled.p`
  flex: 1;
  color: ${({theme}) => theme.colors.gray.medium};
`;

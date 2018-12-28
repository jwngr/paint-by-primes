import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MainContent = styled.div`
  flex: 1;
  min-height: 100vh;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Subtitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  margin: 12px auto 28px auto;
  color: ${(props) => props.theme.colors.blue.medium};
`;

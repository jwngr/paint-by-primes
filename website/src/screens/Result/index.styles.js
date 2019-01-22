import styled from 'styled-components';

import {SIDEBAR_WIDTH_PX} from '../../resources/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MainContent = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: ${SIDEBAR_WIDTH_PX}px;
  width: calc(100% - ${SIDEBAR_WIDTH_PX}px);

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

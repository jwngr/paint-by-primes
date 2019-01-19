import styled from 'styled-components';

import {SIDEBAR_WIDTH_PX} from '../../resources/constants';

export const SidebarWrapper = styled.div`
  width: ${SIDEBAR_WIDTH_PX}px;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding: 20px 12px;
`;

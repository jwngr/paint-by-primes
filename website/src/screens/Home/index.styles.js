import styled, {keyframes} from 'styled-components';

import {SIDEBAR_WIDTH_PX} from '../../resources/constants';

const enterAnimation = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

// const exitAnimation = keyframes`
//   from {
//     transform: translate3d(0, 0, 0);
//   }

//   to {
//     transform: translate3d(-100%, 0, 0);
//   }
// `;

export const MainContent = styled.div`
  /* overflow: hidden; */
  margin-left: ${SIDEBAR_WIDTH_PX}px;
  width: calc(100% - ${SIDEBAR_WIDTH_PX}px);

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const StepWrapper = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.step-enter {
    animation: ${enterAnimation} 0.5s forwards;
  }

  &.step-exit {
    visibility: hidden;
  }
`;

export const StepSummaryWrapper = styled.div`
  padding: 20px;
`;

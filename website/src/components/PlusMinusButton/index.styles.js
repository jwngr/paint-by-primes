import styled from 'styled-components';

export const GooBlob = styled.div`
  z-index: -1;
  opacity: 1;
  display: block;
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 100%;
  transition: transform 0.8s;
  background-color: ${({theme}) => theme.colors.blue.darker};

  &:nth-child(1) {
    transition-delay: 0ms;
    transform: scale(1.3) translate3d(0, -100%, 0);
  }

  &:nth-child(2) {
    transition-delay: 125ms;
    transform: scale(1.3) translate3d(-100%, 100%, 0);
  }

  &:nth-child(3) {
    transition-delay: 60ms;
    transform: scale(1.3) translate3d(100%, 100%, 0);
  }
`;

export const PlusMinusButtonIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlusMinusButtonWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  overflow: hidden;
  fill: ${({theme}) => theme.colors.blue.darker};
  stroke: ${({theme}) => theme.colors.blue.darker};
  border: solid 4px ${({theme}) => theme.colors.blue.darker};
  background-color: ${({theme}) => theme.colors.blue.lightest};
  border-radius: 32px;
  visibility: ${({isHidden}) => (isHidden ? 'hidden' : 'visible')};

  &:hover {
    cursor: pointer;
    fill: ${({theme}) => theme.colors.blue.lightest};
    stroke: ${({theme}) => theme.colors.blue.lightest};

    ${GooBlob} {
      &:nth-child(1) {
        transition-delay: 0ms;
        transform: scale(1.4) translate3d(0, 0, 0);
      }

      &:nth-child(2) {
        transition-delay: 100ms;
        transform: scale(1.4) translate3d(0, 0, 0) rotate(25deg);
      }

      &:nth-child(3) {
        transition-delay: 50ms;
        transform: scale(1.6) translate3d(0, 0, 0);
      }
    }
  }
`;

export const GooBlobContainer = styled.div`
  position: absolute;
  overflow: hidden;
  top: -3px;
  left: -1px;
  bottom: -3px;
  right: -1px;
  z-index: 5;
  border-radius: 100%;
  opacity: 1;
`;

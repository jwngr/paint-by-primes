import styled from 'styled-components';

const getDarkThemeColorBasedOnStepStatus = ({theme, isSelected, isCompleted}) => {
  if (isCompleted) {
    return theme.colors.moss.darkest;
  } else if (isSelected) {
    return theme.colors.peach.darker;
  } else {
    return theme.colors.gray.medium;
  }
};

const getLightThemeColorBasedOnStepStatus = ({theme, isSelected, isCompleted}) => {
  if (isCompleted) {
    return theme.colors.moss.medium;
  } else if (isSelected) {
    return theme.colors.peach.lighter;
  } else {
    return theme.colors.gray.lighter;
  }
};

export const StepIndex = styled.div`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  width: 52px;
  height: 52px;
  margin-right: 8px;
  border: solid 6px;
  border-radius: 60px;
  transition: all 0.6s;

  &::before {
    top: -74px;
    left: 17px;
    width: 6px;
    height: 68px;
    content: '';
    position: absolute;
    transition: background 0.6s;
  }

  svg {
    transition: fill 0.6s, stroke 0.6s;
  }
`;

export const StepDescription = styled.p`
  font-size: 16px;
  font-weight: bold;
  transition: color 0.6s;
`;

export const StepIndexItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 100%;
    z-index: 51;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    transform: translate3d(0, 0, 0);
  }
`;

export const GooBlob = styled.div`
  z-index: -1;
  opacity: 1;
  display: block;
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 100%;
  transition: transform 0.8s, background-color 0.4s;

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

export const StepWrapper = styled.div`
  display: flex;
  height: 120px;
  flex-direction: column;

  ${StepIndex} {
    color: ${getDarkThemeColorBasedOnStepStatus};
    border-color: ${getDarkThemeColorBasedOnStepStatus};
    background-color: ${getLightThemeColorBasedOnStepStatus};

    &::before {
      background-color: ${({theme, isSelected, isCompleted}) => {
        if (isSelected || isCompleted) {
          return theme.colors.moss.darkest;
        } else {
          return theme.colors.gray.medium;
        }
      }};
    }

    svg {
      fill: ${getDarkThemeColorBasedOnStepStatus};
      stroke: ${getDarkThemeColorBasedOnStepStatus};
    }
  }

  ${StepDescription} {
    color: ${getDarkThemeColorBasedOnStepStatus};
  }

  ${StepIndexItem} > div {
    transform: ${({isSelected, isCompleted}) => {
      return isSelected || isCompleted ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)';
    }};
  }

  ${GooBlob} {
    background-color: ${getDarkThemeColorBasedOnStepStatus};
  }

  &:first-of-type ${StepIndex}::before {
    display: none;
  }

  &:nth-of-type(2) .step-details {
    flex-direction: column;
  }

  &:nth-of-type(2) .step-details p:first-of-type {
    margin-bottom: 8px;
  }

  &:nth-of-type(3) .step-details,
  &:nth-of-type(4) .step-details {
    flex-wrap: wrap;
    flex-direction: row;
  }

  &:hover {
    ${StepIndex} {
      cursor: default;
    }

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

    ${StepIndexItem} > div {
      fill: ${(props) => props.theme.colors.moss.lightest};
      color: ${(props) => props.theme.colors.moss.lightest};
      stroke: ${(props) => props.theme.colors.moss.lightest};
      transform: translate3d(0, -100%, 0);
      cursor: ${({isSelected, isCompleted}) => {
        return isSelected || isCompleted ? 'pointer' : 'normal';
      }};
    }
  }
`;

export const StepHeader = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const StepDetails = styled.div`
  flex: 1;
  display: flex;
  margin-top: -12px;
  margin-left: 32px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const GooBlobContainer = styled.div`
  position: absolute;
  overflow: hidden;
  top: -3px;
  left: -1px;
  bottom: -3px;
  right: -1px;
  z-index: 50;
  border-radius: 100%;
  opacity: 1;
`;

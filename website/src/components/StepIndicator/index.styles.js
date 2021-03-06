import styled from 'styled-components';

const getDarkThemeColorBasedOnStepStatus = ({theme, isSelected, isCompleted}) => {
  if (isSelected) {
    return theme.colors.red.medium;
  } else if (isCompleted) {
    return theme.colors.green.darker;
  } else {
    return theme.colors.gray.medium;
  }
};

const getLightThemeColorBasedOnStepStatus = ({theme, isSelected, isCompleted}) => {
  if (isSelected) {
    return theme.colors.red.lightest;
  } else if (isCompleted) {
    return theme.colors.green.lightest;
  } else {
    return theme.colors.gray.lighter;
  }
};

export const StepNumber = styled.div`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  width: 52px;
  height: 52px;
  margin-right: 8px;
  border: solid 6px;
  border-radius: 60px;
  transition: color 0.6s, border-color 0.6s, background-color 0.6s;

  svg {
    transition: fill 0.6s, stroke 0.6s;
  }
`;

export const StepDescription = styled.p`
  font-size: 16px;
  font-weight: bold;
  transition: color 0.6s;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const StepNumberItem = styled.div`
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
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s;
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

export const StepIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: ${({isClickable}) => (isClickable ? 'pointer' : 'deafult')};

  ${StepNumber} {
    color: ${getDarkThemeColorBasedOnStepStatus};
    border-color: ${getDarkThemeColorBasedOnStepStatus};
    background-color: ${getLightThemeColorBasedOnStepStatus};

    svg {
      fill: ${getDarkThemeColorBasedOnStepStatus};
      stroke: ${getDarkThemeColorBasedOnStepStatus};
    }
  }

  ${StepDescription} {
    color: ${getDarkThemeColorBasedOnStepStatus};
  }

  ${StepNumberItem} > div {
    transform: ${({isClickable}) => {
      return isClickable ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)';
    }};
  }

  ${GooBlob} {
    background-color: ${getDarkThemeColorBasedOnStepStatus};
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

    ${({theme, isSelected, isCompleted, isClickable}) => {
      const lightThemeColor = getLightThemeColorBasedOnStepStatus({theme, isSelected, isCompleted});

      return (
        isClickable &&
        `${StepNumberItem} > div {
          fill: ${lightThemeColor};
          color: ${lightThemeColor};
          stroke: ${lightThemeColor};
          transform: translate3d(0, -100%, 0);
        }
        `
      );
    }}
  }
`;

export const GooBlobWrapper = styled.div`
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

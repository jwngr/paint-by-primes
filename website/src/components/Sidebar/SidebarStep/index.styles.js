import styled from 'styled-components';

export const SidebarStepWrapper = styled.div`
  display: flex;
  height: 120px;
  position: relative;
  flex-direction: column;

  &::before {
    top: -68px;
    left: 23px;
    width: 6px;
    height: 68px;
    content: '';
    position: absolute;
    transition: background-color 0.6s;
    background-color: ${({theme, isSelected, isCompleted}) => {
      if (isSelected || isCompleted) {
        return theme.colors.green.darker;
      } else {
        return theme.colors.gray.medium;
      }
    }};
  }

  &:first-of-type {
    &::before {
      content: none;
    }
  }
`;

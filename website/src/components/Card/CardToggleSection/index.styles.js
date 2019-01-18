import styled from 'styled-components';

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ToggleLabel = styled.label`
  width: 80px;
  height: 40px;
  position: relative;
  display: inline-block;
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({theme}) => theme.colors.gray.lighter};
  transition: 0.4s;
  border-radius: 34px;
  border: solid 4px ${({theme}) => theme.colors.blue.darker};

  &:before {
    position: absolute;
    content: '';
    width: 28px;
    height: 28px;
    left: 2px;
    bottom: 2px;
    transition: 0.4s;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.blue.lightest};
  }
`;

export const ToggleInput = styled.input`
  /* Hide the default HTML input. */
  width: 0;
  height: 0;
  opacity: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${({theme}) => theme.colors.blue.darker};

    &:before {
      transform: translateX(40px);
    }
  }
`;

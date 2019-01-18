import styled from 'styled-components';

import {getHsp} from '../../../lib/utils';

import {IMAGE_BORDER_WIDTH_PX} from '../../../resources/constants';

export const LoadingIndicatorWrapper = styled.div`
  display: grid;
  border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};
  grid-template-rows: repeat(10, 32px);
  grid-template-columns: repeat(10, 32px);
`;

export const LoadingIndicatorCell = styled.p`
  background-color: ${({theme}) => theme.colors.blue.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({hexValue}) => hexValue};
  color: ${({theme, hexValue}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
`;

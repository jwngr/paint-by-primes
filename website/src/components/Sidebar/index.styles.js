import {darken} from 'polished';
import styled from 'styled-components';

import {getHsp} from '../../lib/utils';

import {SIDEBAR_WIDTH_PX} from '../../resources/constants';

export const SidebarWrapper = styled.div`
  width: ${SIDEBAR_WIDTH_PX}px;
  height: 100vh;
  position: fixed;
  padding: 20px 12px;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 28px;
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

export const SourceImage = styled.img`
  margin: auto;
  width: ${({width, height}) => (64 / height) * width}px;
  height: 64px;
`;

export const Swatch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 4px 8px;
  user-select: none;
  font-size: 17px;
  color: ${({hexValue, theme}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
`;

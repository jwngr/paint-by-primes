import {darken} from 'polished';
import styled from 'styled-components';

import {getHsp} from '../../lib/utils';

import {SIDEBAR_WIDTH_PX} from '../../resources/constants';

export const SidebarWrapper = styled.div`
  width: ${SIDEBAR_WIDTH_PX}px;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding: 20px 12px;
`;

export const StepDetails = styled.div`
  flex: 1;
  display: flex;
  margin-top: -14px;
  margin-left: 28px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const SourceImage = styled.img`
  margin: auto;
  width: ${({width, height}) => (64 / height) * width}px;
  height: 64px;
`;

export const ImageDimensions = styled.div`
  font-size: 20px;
`;

export const SwatchesWrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-rows: repeat(auto-fill, 28px);
  grid-template-columns: repeat(5, 28px);
  grid-row-gap: 6px;
  grid-column-gap: 6px;
`;

export const Swatch = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({hexValue, theme}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
`;

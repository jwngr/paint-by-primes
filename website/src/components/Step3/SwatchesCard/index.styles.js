import {darken} from 'polished';
import styled from 'styled-components';

import Card from '../../Card';

import {getHsp} from '../../../lib/utils';

export const SwatchesCardWrapper = styled(Card)`
  order: 2;
  width: 100%;
  max-width: 400px;
  margin-right: 0;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    order: 1;
    margin-right: 20px;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`;

export const SwatchesWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 32px);
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  grid-row-gap: 8px;
  grid-column-gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
`;

export const SwatchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;

    &::before {
      content: '\xD7';
      margin: 0 2px 0 4px;
    }
  }

  @media (max-width: 768px) {
    p {
      font-size: 12px;

      &::before {
        margin: 0 0 0 4px;
      }
    }
  }
`;

export const Swatch = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  user-select: none;
  position: relative;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

export const ColorPicker = styled.div`
  z-index: 10;
  opacity: 1;
  position: absolute;
  top: 40px;
`;

export const Asterisk = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;

  svg {
    width: 12px;
    height: 12px;
    fill: ${({hexValue}) => {
      return getHsp(hexValue) > 170 ? darken(0.2, hexValue) : hexValue;
    }};
    stroke: ${({hexValue}) => {
      return getHsp(hexValue) > 170 ? darken(0.2, hexValue) : hexValue;
    }};
  }

  @media (max-width: 768px) {
    margin-left: 2px;

    svg {
      width: 10px;
      height: 10px;
    }
  }
`;

export const PencilIcon = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: ${({theme, hexValue}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
  transform: rotate(90deg);
`;

import {darken} from 'polished';
import styled from 'styled-components';

import Card from '../../Card';

import {getHsp} from '../../../lib/utils';

export const PencilColorCardWrapper = styled(Card)`
  width: 220px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-bottom: 0;
  }

  @media (max-width: 800px) {
    flex: 1;
    width: inherit;
    margin-bottom: 20px;
  }
`;

export const PencilColorSwatchesWrapper = styled.div`
  display: grid;
  margin-bottom: 8px;
  grid-template-rows: repeat(auto-fill, 32px);
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  grid-row-gap: 8px;
  grid-column-gap: 8px;
`;

export const PencilColorSwatchWrapper = styled.div``;

export const PencilColorSwatch = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  user-select: none;
  position: relative;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
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

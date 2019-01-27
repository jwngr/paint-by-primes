import {darken} from 'polished';
import styled from 'styled-components';

import Card from '../../Card';

import {getHsp} from '../../../lib/utils';

export const StatsCardWrapper = styled(Card)`
  max-width: 220px;
  margin-right: 0;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-right: 12px;
  }
`;

export const SwatchesWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 32px);
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  grid-row-gap: 8px;
  grid-column-gap: 8px;
`;

export const Swatch = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  background-color: ${({hexValue}) => hexValue};
  border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
  color: ${({theme, hexValue}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
`;

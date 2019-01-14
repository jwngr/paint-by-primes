import {darken} from 'polished';
import styled from 'styled-components';

import Card from '../../Card';

import {getHsp} from '../../../lib/utils';

export const SwatchDigitsCardWrapper = styled(Card)`
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

export const SwatchesWrapper = styled.div`
  display: grid;
  margin-bottom: 8px;
  grid-template-rows: repeat(auto-fill, 40px);
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  grid-row-gap: 8px;
  grid-column-gap: 8px;
`;

export const SwatchWrapper = styled.div``;

export const Swatch = styled.div`
  width: 40px;
  height: 40px;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    font-size: 24px;
    text-align: center;
    background-color: ${({hexValue}) => hexValue};
    border: solid 2px ${({hexValue}) => darken(0.2, hexValue)};
    color: ${({theme, hexValue}) => {
      const hsp = getHsp(hexValue);
      return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
    }};
  }
`;

export const Asterisk = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${({theme, hexValue}) => {
    const hsp = getHsp(hexValue);
    return hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest;
  }};
`;

export const Footnote = styled.p`
  font-size: 14px;
  color: ${({theme}) => theme.colors.gray.medium};
`;

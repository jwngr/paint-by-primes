import {darken} from 'polished';
import styled from 'styled-components';

import Card from '../../Card';

import {getHsp} from '../../../lib/utils';

export const SwatchColorPickersCardWrapper = styled(Card)`
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const SwatchWrapper = styled.div`
  width: 50%;
  margin: 8px 0;
  display: flex;
  align-items: center;
  flex-direction: row;

  p {
    font-size: 14px;

    &::before {
      content: '\xD7';
      margin: 0 4px 0 8px;
    }
  }

  @media (max-width: 1200px) {
    width: 100px;
  }
`;

export const EmptySwatchWrapper = styled.div`
  width: 50%;

  @media (max-width: 1200px) {
    width: 100px;
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
`;

export const ColorPicker = styled.div`
  z-index: 10;
  opacity: 1;
  position: absolute;
  top: 40px;
`;

export const Asterisk = styled.span`
  color: ${({hexValue}) => {
    return getHsp(hexValue) > 170 ? darken(0.2, hexValue) : hexValue;
  }};
`;

export const Footnote = styled.p`
  font-size: 14px;
  margin-top: 8px;
  color: ${({theme}) => theme.colors.gray.medium};
`;
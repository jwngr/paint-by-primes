import styled from 'styled-components';
import {SketchPicker} from 'react-color';

import Card from '../../Card';

export const ColorPickerCardWrapper = styled(Card)`
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
`;

export const ColorPicker = styled(SketchPicker)`
  width: initial !important;
`;

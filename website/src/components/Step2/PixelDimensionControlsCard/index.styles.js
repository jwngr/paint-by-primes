import styled from 'styled-components';

import Card from '../../Card';

export const PixelDimensionControlsCardWrapper = styled(Card)`
  width: 100%;
  max-width: 320px;
  margin-right: 0;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 50%;
    margin-right: 20px;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`;

import styled from 'styled-components';

import Card from '../../Card';

export const PixelatedImageSizeResultsCardWrapper = styled(Card)`
  width: 100%;
  max-width: 320px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

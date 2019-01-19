import styled from 'styled-components';

import Card from '../../Card';

export const ProgressCardWrapper = styled(Card)`
  width: 220px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex: 1;
    width: inherit;
    margin-bottom: 20px;
  }
`;

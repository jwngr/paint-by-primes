import styled from 'styled-components';

import Card from '../../Card';

export const ShareCardWrapper = styled(Card)`
  width: 220px;
  max-width: 460px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
  }
`;

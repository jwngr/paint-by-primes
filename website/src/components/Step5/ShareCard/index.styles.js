import styled from 'styled-components';

import Card from '../../Card';
import Button from '../../Button';

export const ShareCardWrapper = styled(Card)`
  width: 220px;
  max-width: 460px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const ShareButton = styled(Button)`
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }

  svg {
    width: 32px;
    margin-right: 8px;
  }

  & > div:first-of-type {
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 100%;

    svg {
      margin-right: 12px;
    }
  }
`;

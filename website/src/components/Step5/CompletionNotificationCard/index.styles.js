import styled from 'styled-components';

import Card from '../../Card';

export const CompletionNotificationCardWrapper = styled(Card)`
  flex: 1;
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

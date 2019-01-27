import styled from 'styled-components';

import Card, {CardBody} from '../../Card';

export const PrimeImageControlsCardWrapper = styled(Card)`
  width: 220px;
  max-width: 460px;
  margin-right: 0;
  margin-bottom: 20px;

  ${CardBody} {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1200px) {
    margin-right: 20px;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;

    ${CardBody} {
      flex-direction: row;

      & > div {
        flex: 1;
      }
    }
  }
`;

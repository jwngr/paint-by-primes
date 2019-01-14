import styled from 'styled-components';

import Card, {CardBody} from '../../Card';

export const PixelatedImageSizeResultsCardWrapper = styled(Card)`
  width: 200px;
  margin-bottom: 20px;

  ${CardBody} {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1200px) {
    flex: 1;
    width: initial;
    margin-bottom: 0;

    ${CardBody} {
      flex-direction: row;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 20px;

    ${CardBody} {
      flex-direction: row;
    }
  }
`;

export const PixelatedImageSizeResultsWrapper = styled.div`
  width: 100%;
  margin-right: 0;

  @media (max-width: 1200px) {
    width: 148px;
    margin-right: 20px;
  }
`;

export const TimeEstimateMessage = styled.div`
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  color: ${({theme}) => theme.colors.gray.medium};

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    fill: ${({digitsCountColor}) => digitsCountColor};
    stroke: ${({digitsCountColor}) => digitsCountColor};
  }

  p {
    flex: 1;
  }

  @media (max-width: 1200px) {
    flex: 1;
    margin-top: 0;
    max-width: 200px;
  }
`;

import styled from 'styled-components';

import Card, {CardBody} from '../../Card';

export const PixelDimensionControlsCardWrapper = styled(Card)`
  margin-right: 0;
  margin-bottom: 20px;

  ${CardBody} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 1200px) {
    min-width: 200px;
    max-width: 260px;
    margin-right: 20px;
    margin-bottom: 0;
  }

  @media (max-width: 800px) {
    min-width: 100%;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;

    ${CardBody} {
      flex-direction: row;
      justify-content: space-around;
    }
  }
`;

export const PixelDimensionControlWrapper = styled.div`
  color: ${({theme}) => theme.colors.blue.medium};

  &:first-of-type {
    margin-right: 0;
    margin-bottom: 12px;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 800px) {
    &:first-of-type {
      margin-right: 12px;
      margin-bottom: 0;
    }
  }
`;

export const PixelDimensionValue = styled.p`
  font-size: 40px;
  margin: 0 8px;
  min-width: 48px;
`;

import styled from 'styled-components';

import Card, {CardBody} from '../../Card';

import {
  PRIME_IMAGE_MAX_DIGIT_COUNT,
  PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT,
} from '../../../resources/constants';

const _getDigitsCountColor = (colors, digitsCount) => {
  if (digitsCount > PRIME_IMAGE_MAX_DIGIT_COUNT) {
    return colors.red.darker;
  } else if (digitsCount > PRIME_IMAGE_MAX_DIGIT_WARNING_COUNT) {
    return colors.orange.darker;
  } else {
    return colors.green.darker;
  }
};

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

  /* & > p {
    padding: 8px 0;
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.gray.lightest};
    text-shadow: 1px 1px 6px ${({theme}) => theme.colors.gray.darkest};
    background-color: ${({theme, digitsCount}) => _getDigitsCountColor(theme.colors, digitsCount)};
  } */

  /* & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32px;
    padding: 0 12px;
    text-align: center;
  } */
`;

export const PixelatedImageSizeResultsWrapper = styled.div`
  width: 100%;
  margin-right: 0;

  @media (max-width: 1200px) {
    width: 148px;
    margin-right: 20px;
  }
`;

export const PixelatedImageSizeResultWrapper = styled.div`
  &:nth-of-type(1) {
    margin-bottom: 12px;
  }

  p:nth-of-type(2) {
    color: ${({theme, digitsCount}) => _getDigitsCountColor(theme.colors, digitsCount)};
    font-size: 32px;
    padding: 0 12px;
    text-align: center;
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
    fill: ${({theme, digitsCount}) => _getDigitsCountColor(theme.colors, digitsCount)};
    stroke: ${({theme, digitsCount}) => _getDigitsCountColor(theme.colors, digitsCount)};
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

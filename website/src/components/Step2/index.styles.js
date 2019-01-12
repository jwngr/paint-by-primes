import styled from 'styled-components';

import Card, {CardBody} from '../Card';

import {MAX_DIGITS, MAX_DIGITS_WITHOUT_WARNING} from './index';

const _getDigitsCountColor = (colors, digitsCount) => {
  if (digitsCount > MAX_DIGITS) {
    return colors.red.darker;
  } else if (digitsCount > MAX_DIGITS_WITHOUT_WARNING) {
    return colors.orange.darker;
  } else {
    return colors.green.darker;
  }
};

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 100%;
  align-items: start;
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const ControlsAndButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  margin-right: 40px;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const ControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    flex-direction: row;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const PixelDimensionsCard = styled(Card)`
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

export const PixelDimensionControl = styled.div`
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

export const PixelatedImageSizeCard = styled(Card)`
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

export const PixelatedImageSizeResults = styled.div`
  width: 100%;
  margin-right: 0;

  @media (max-width: 1200px) {
    width: 148px;
    margin-right: 20px;
  }
`;

export const PixelatedImageSizeResult = styled.div`
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

export const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  margin: auto;
  width: ${({width}) => width + 12}px;
  height: ${({height}) => height + 12}px;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};

  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
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

const Line = styled.div`
  position: absolute;
  opacity: 0.5;
`;

export const VerticalLine = styled(Line)`
  border-top: solid 1px ${({theme}) => theme.colors.gray.darkest}80;
  top: ${({top}) => top}px;
  left: 0;
  width: ${({width}) => width}px;
  height: 1px;
`;

export const HorizontalLine = styled(Line)`
  border-left: solid 1px ${({theme}) => theme.colors.gray.darkest}80;
  top: 0;
  left: ${({left}) => left}px;
  width: 1px;
  height: ${({height}) => height}px;
`;

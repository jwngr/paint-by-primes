import {darken} from 'polished';
import styled from 'styled-components';

import {getHsp} from '../../lib/utils';

const StepDetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: -14px;
  margin-left: 28px;
  text-align: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 12px;
    margin-left: 0;
  }
`;

export const Step1DetailsWrapper = styled(StepDetailsWrapper)`
  img {
    margin: auto;
    width: ${({width, height}) => (64 / height) * width}px;
    height: 64px;
  }

  @media (max-width: 768px) {
    img {
      width: 120px;
      height: ${({width, height}) => (120 / width) * height}px;
    }
  }
`;

export const Step2DetailsWrapper = styled(StepDetailsWrapper)`
  p {
    font-size: 20px;

    &:first-of-type {
      margin-bottom: 8px;
    }
  }

  @media (max-width: 768px) {
    p {
      font-size: 28px;
    }
  }
`;

export const Step3DetailsWrapper = styled(StepDetailsWrapper)``;

export const Step4DetailsWrapper = styled(StepDetailsWrapper)``;

export const Step5DetailsWrapper = styled(StepDetailsWrapper)``;

export const SwatchesWrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-rows: repeat(auto-fill, 28px);
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 6px;
  grid-column-gap: 6px;

  @media (max-width: 768px) {
    grid-template-rows: repeat(auto-fill, 40px);
  }
`;

export const Swatch = styled.div.attrs(({theme, hexValue}) => {
  const hsp = getHsp(hexValue);

  return {
    style: {
      color: hsp > 170 ? theme.colors.gray.darkest : theme.colors.gray.lightest,
      border: `solid 2px ${darken(0.2, hexValue)}`,
      backgroundColor: hexValue,
    },
  };
})`
  width: 28px;
  height: 28px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

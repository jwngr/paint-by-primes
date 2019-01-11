import styled from 'styled-components';

export const ContentWrapper = styled.div`
  text-align: center;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex-direction: row;
`;

export const PixelDimensionsWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
`;

export const PixelDimension = styled.div`
  color: ${(props) => props.theme.colors.blue.medium};

  & > p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;
export const PixelDimensionValue = styled.p`
  font-size: 40px;
  margin: 0 8px;
  min-width: 48px;
`;

export const PlusMinusButton = styled.p`
  font-size: 32px;
  user-select: none;
  visibility: ${({isHidden}) => (isHidden ? 'hidden' : 'normal')};

  &:hover {
    cursor: pointer;
  }
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({digitsCountColor}) => digitsCountColor};
  border: solid 6px ${({digitsCountColor}) => digitsCountColor};
  border-top: none;

  & > p {
    padding: 8px 0;
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.white};
    text-shadow: 1px 1px 6px ${(props) => props.theme.colors.gray.darkest};
    background-color: ${({digitsCountColor}) => digitsCountColor};
  }

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  border: solid 6px ${(props) => props.theme.colors.blue.medium};

  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

export const TimeEstimateMessage = styled.div`
  width: 340px;
  margin: auto;
  margin-bottom: 20px;

  b {
    color: ${({digitsCountColor}) => digitsCountColor};
  }
`;

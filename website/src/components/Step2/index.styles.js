import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
`;

export const LeftContentWrapper = styled.div`
  width: 400px;
  margin-right: 20px;
`;

export const PixelDimensionsWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
`;

export const PixelDimension = styled.div`
  flex: 1;
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

export const ResultWrapper = styled.div`
  width: 60%;
  margin: 0 auto 20px auto;
  border: solid 1px blue;
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
    font-size: 32px;
    padding: 8px 0;
    text-align: center;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  border: solid 6px ${(props) => props.theme.colors.blue.medium};

  img {
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
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

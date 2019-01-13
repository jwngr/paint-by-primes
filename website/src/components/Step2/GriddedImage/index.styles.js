import styled from 'styled-components';

export const GriddedImageWrapper = styled.div`
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

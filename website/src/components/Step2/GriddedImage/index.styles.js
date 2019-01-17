import styled from 'styled-components';

export const GriddedImageWrapper = styled.div`
  margin: 0;
  position: relative;
  width: ${({width}) => width + 12}px;
  height: ${({height}) => height + 12}px;
  border: solid 6px ${({theme}) => theme.colors.blue.medium};

  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  @media (max-width: 1200px) {
    margin: auto;
  }
`;

const Line = styled.div`
  opacity: 0.5;
  position: absolute;
  border: solid 0 ${({theme}) => theme.colors.gray.darkest}80;
`;

export const VerticalLine = styled(Line).attrs(({top, width}) => ({
  style: {
    top: `${top}px`,
    width: `${width}px`,
  },
}))`
  left: 0;
  height: 1px;
  border-top-width: 1px;
`;

export const HorizontalLine = styled(Line).attrs(({left, height}) => ({
  style: {
    left: `${left}px`,
    height: `${height}px`,
  },
}))`
  top: 0;
  width: 1px;
  border-left-width: 1px;
`;

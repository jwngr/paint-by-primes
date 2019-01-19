import styled from 'styled-components';

import {IMAGE_BORDER_WIDTH_PX} from '../../../resources/constants';

export const GriddedImageWrapper = styled.div`
  order: 2;
  margin: 0;
  max-width: 100%;
  position: relative;
  width: ${({width}) => width + 2 * IMAGE_BORDER_WIDTH_PX}px;
  height: ${({height}) => height + 2 * IMAGE_BORDER_WIDTH_PX}px;
  border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};

  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  @media (max-width: 1200px) {
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 12px;
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

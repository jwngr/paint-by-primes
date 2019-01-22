import styled from 'styled-components';

import {IMAGE_BORDER_WIDTH_PX} from '../../resources/constants';

export const LogoWithSubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
    border: solid 4px ${({theme}) => theme.colors.blue.darker};
    cursor: pointer;
  }

  p {
    width: 200px;
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
    color: ${({theme}) => theme.colors.blue.darker};
  }

  @media (max-width: 768px) {
    img {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
      border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};
    }

    p {
      width: 100%;
      font-size: 28px;
      line-height: 1.5;
      font-weight: normal;
    }
  }
`;

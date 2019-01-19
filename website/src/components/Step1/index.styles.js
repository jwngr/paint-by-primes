import styled from 'styled-components';

import Button from '../Button';

import {IMAGE_BORDER_WIDTH_PX} from '../../resources/constants';

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const SubContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > div:first-of-type {
    margin-right: 80px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    & > div:first-of-type {
      margin-right: 0;
    }
  }
`;

export const ImageComparisonWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border: solid ${IMAGE_BORDER_WIDTH_PX}px ${({theme}) => theme.colors.blue.darker};

  @media (max-width: 1200px) {
    max-width: 280px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    max-width: 360px;
    margin-bottom: 20px;
  }
`;

export const StepInstructions = styled.p`
  margin: auto;
  font-size: 28px;
  max-width: 320px;
  line-height: 1.5;
  text-align: center;
  color: ${({theme}) => theme.colors.blue.darker};
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ImageSelectionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageSelectionButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const ImageSelectionButton = styled(Button)`
  width: 100%;
  max-width: 360px;
  font-size: 20px;

  svg {
    width: 32px;
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    height: 68px;

    svg {
      margin-right: 12px;
    }
  }
`;

export const FileInput = styled.input`
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
  overflow: hidden;
  position: absolute;
`;

export const InvalidImageUrlMessage = styled.p`
  margin: 6px 0 0 0;
  text-align: center;
  color: ${({theme}) => theme.colors.red.darker};
`;

import styled from 'styled-components';

export const Subtitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  margin: 12px auto 28px auto;
  color: ${({theme}) => theme.colors.blue.medium};
`;

export const ImageExplanation = styled.div`
  display: flex;
  border: solide 1px red;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;

  img {
    width: 240px;
    height: 240px;
    margin: 0 40px;
  }
`;

export const FileButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  svg {
    margin-right: 12px;
  }
`;

export const OrSeparator = styled.p`
  margin: 0 24px;
  font-weight: bold;
  font-size: 24px;
  color: ${({theme}) => theme.colors.blue.medium};
`;

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const InvalidImageUrlMessage = styled.p`
  margin-top: 8px;
  text-align: center;
  color: ${({theme}) => theme.colors.peach.darker};
`;

import styled from 'styled-components';

export const GooeyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: auto;
  padding: 12px;
  min-width: 200px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.blue.medium};
  fill: ${(props) => props.theme.colors.blue.medium};
  stroke: ${(props) => props.theme.colors.blue.medium};
  background: transparent;
  border: solid 6px ${(props) => props.theme.colors.blue.medium};
  border-radius: 12px;
  font-variant: small-caps;
  transition: all 0.5s, background 0.25s, height 1s, width 0.5s;

  &:hover {
    fill: ${(props) => props.theme.colors.moss.lightest};
    color: ${(props) => props.theme.colors.moss.lightest};
    stroke: ${(props) => props.theme.colors.moss.lightest};

    .goo-blob-container > div {
      &:nth-child(1) {
        transition-delay: 0ms;
        transform: scale(1.4) translateY(0) translateZ(0);
      }

      &:nth-child(2) {
        transition-delay: 100ms;
        transform: scale(1.4) translateY(0) translateZ(0) rotate(25deg);
      }

      &:nth-child(3) {
        transition-delay: 50ms;
        transform: scale(1.6) translateY(0) translateZ(0);
      }

      &:nth-child(4) {
        transition-delay: 120ms;
        transform: scale(1.5) translateY(0) translateZ(0) rotate(-25deg);
      }
    }
  }

  &:disabled {
    cursor: default;
    color: ${(props) => props.theme.colors.gray.medium};
    fill: ${(props) => props.theme.colors.gray.medium};
    stroke: ${(props) => props.theme.colors.gray.medium};
    border: solid 6px ${(props) => props.theme.colors.gray.medium};

    .goo-blob-container > div {
      transition: none;
      background-color: transparent;
    }
  }
`;

export const GooBlobContainer = styled.div`
  position: absolute;
  overflow: hidden;
  top: -3px;
  left: -1px;
  bottom: -3px;
  right: -1px;
`;

export const GooBlob = styled.div`
  z-index: -1;
  opacity: 1;
  display: block;
  position: absolute;
  width: 30%;
  height: 100%;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.blue.medium};
  transform: scale(1.3) translateY(125%) translateZ(0);
  transition: all 0.5s;

  &:nth-child(1) {
    left: -5%;
    transition-delay: 0ms;
  }

  &:nth-child(2) {
    left: 20%;
    transition-delay: 50ms;
  }

  &:nth-child(3) {
    left: 45%;
    transition-delay: 25ms;
  }

  &:nth-child(4) {
    left: 75%;
    transition-delay: 50ms;
  }
`;

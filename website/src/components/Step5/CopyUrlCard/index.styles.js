import styled from 'styled-components';

import Card from '../../Card';

export const CopyUrlCardWrapper = styled(Card)`
  flex: 1;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    max-width: 460px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const Url = styled.p`
  width: 100%;
  font-size: 18px;
  cursor: pointer;
`;

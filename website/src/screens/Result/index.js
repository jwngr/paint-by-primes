import React from 'react';

import Step5 from '../../components/Step5/container';
import Sidebar from '../../components/Sidebar';

import {Wrapper, MainContent} from './index.styles';

class ResultScreen extends React.Component {
  render() {
    console.log('render ResultScreen');
    return (
      <Wrapper>
        <Sidebar />
        <MainContent>
          <Step5 />
        </MainContent>
      </Wrapper>
    );
  }
}

export default ResultScreen;

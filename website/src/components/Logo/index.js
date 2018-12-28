import _ from 'lodash';
import React from 'react';

import {LogoInner, LogoWrapper} from './index.styles';

class Logo extends React.Component {
  state = {
    title: 'PRIME IMAGES',
  };

  componentDidMount() {
    this.addLetterFlicker(2, 'I', '1');
    this.addLetterFlicker(4, 'E', '3');
    this.addLetterFlicker(6, 'I', '1');
    this.addLetterFlicker(10, 'E', '3');
    this.addLetterFlicker(11, 'S', '5');
  }

  addLetterFlicker = (index, letter, number) => {
    let delay = _.random(2, 10) * 1000;
    let timeout = setTimeout(() => {
      const {title} = this.state;

      const letters = title.split('');
      letters[index] = title[index] === letter ? number : letter;

      this.setState({
        title: letters.join(''),
      });

      clearTimeout(timeout);

      this.addLetterFlicker(index, letter, number);
    }, delay);
  };

  render() {
    const {title} = this.state;
    const {fontSize} = this.props;

    return (
      <LogoWrapper>
        <LogoInner fontSize={fontSize}>{title}</LogoInner>
      </LogoWrapper>
    );
  }
}

export default Logo;

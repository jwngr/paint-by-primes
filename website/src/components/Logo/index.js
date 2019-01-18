import React from 'react';

import logo from '../../images/logo@2x.png';
import {LogoWrapper} from './index.styles';

/* TODO: remove need for this component. */

class Logo extends React.Component {
  render() {
    const {width, height, borderWidth} = this.props;

    return (
      <LogoWrapper width={width} height={height} borderWidth={borderWidth}>
        {/* TODO: ensure name is correct */}
        <img src={logo} alt="Paint By Primes logo" />
      </LogoWrapper>
    );
  }
}

export default Logo;

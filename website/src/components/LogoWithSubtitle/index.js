import React from 'react';

/* TODO: Create high quality logo. */
import logo from '../../images/logo@2x.png';

import {LogoWithSubtitleWrapper} from './index.styles';

export default ({className}) => {
  return (
    <LogoWithSubtitleWrapper className={className}>
      <img src={logo} alt="Paint By Primes logo" />
      <p>Generate a prime number that looks like any image.</p>
    </LogoWithSubtitleWrapper>
  );
};

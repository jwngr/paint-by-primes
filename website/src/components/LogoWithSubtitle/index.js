import React from 'react';
import {connect} from 'react-redux';

import {setCurrentStep} from '../../store/actions';

/* TODO: Create high quality logo. */
import logo from '../../images/logo@2x.png';

import {LogoWithSubtitleWrapper} from './index.styles';

const LogoWithSubtitle = ({className, navigateToHomeScreen}) => {
  return (
    <LogoWithSubtitleWrapper className={className}>
      <img src={logo} alt="Paint By Primes logo" onClick={navigateToHomeScreen} />
      <p>Generate a prime number that looks like any image.</p>
    </LogoWithSubtitleWrapper>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToHomeScreen: () => {
      dispatch(setCurrentStep(1));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoWithSubtitle);

import {connect} from 'react-redux';
import {push} from 'redux-little-router';

import {setDigitMappings} from '../../actions';

import Step4 from './index';

const mapStateToProps = ({
  sourceImage,
  pixelatedImage,
  pixelDimensions,
  hexValuesToDigits,
  hexValueIndexesToDigits,
}) => ({
  sourceImage,
  pixelatedImage,
  pixelDimensions,
  hexValuesToDigits,
  hexValueIndexesToDigits,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDigitMappings: (digitMappings, primeImageId) => {
      dispatch(setDigitMappings(digitMappings));
      dispatch(push(`/p/${primeImageId}`));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4);

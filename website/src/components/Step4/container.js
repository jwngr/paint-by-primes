import {connect} from 'react-redux';

import {setDigitMappings} from '../../actions';

import Step4 from './index';

const mapStateToProps = ({
  digitMappings,
  pixelatedImage,
  pixelDimensions,
  hexValuesToDigits,
  latestCompletedStep,
  hexValueIndexesToDigits,
}) => ({
  digitMappings,
  pixelatedImage,
  pixelDimensions,
  hexValuesToDigits,
  latestCompletedStep,
  hexValueIndexesToDigits,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDigitMappings: (digitMappings) => {
      dispatch(setDigitMappings(digitMappings));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4);

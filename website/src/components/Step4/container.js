import {connect} from 'react-redux';

import {history} from '../../lib/configureReduxStore';
import {setDigitMappings} from '../../store/actions';

import Step4 from './index';

const mapStateToProps = ({app}) => ({
  sourceImage: app.sourceImage,
  pixelatedImage: app.pixelatedImage,
  pixelDimensions: app.pixelDimensions,
  hexValuesToDigits: app.hexValuesToDigits,
  hexValueIndexesToDigits: app.hexValueIndexesToDigits,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDigitMappings: (digitMappings, postId) => {
      dispatch(setDigitMappings(digitMappings));
      history.push(`/p/${postId}`);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step4);

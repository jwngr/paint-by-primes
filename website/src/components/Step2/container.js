import {connect} from 'react-redux';

import {setPixelDimensions} from '../../actions';

import Step2 from './index';

const mapStateToProps = ({sourceImage, pixelDimensions}) => ({
  sourceImage,
  pixelDimensions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPixelDimensions: (pixelDimensions) => {
      dispatch(setPixelDimensions(pixelDimensions));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2);

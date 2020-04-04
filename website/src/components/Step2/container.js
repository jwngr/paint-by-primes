import {connect} from 'react-redux';

import {setPixelDimensions} from '../../store/actions';

import Step2 from './index';

const mapStateToProps = ({app}) => ({
  sourceImage: app.sourceImage,
  pixelDimensions: app.pixelDimensions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPixelDimensions: (pixelDimensions) => {
      dispatch(setPixelDimensions(pixelDimensions));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);

import {connect} from 'react-redux';

import {setPixelatedImage} from '../../store/actions';

import Step3 from './index';

const mapStateToProps = ({app}) => ({
  sourceImage: app.sourceImage,
  pixelatedImage: app.pixelatedImage,
  pixelDimensions: app.pixelDimensions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPixelatedImage: (pixelatedImage) => {
      dispatch(setPixelatedImage(pixelatedImage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3);

import {connect} from 'react-redux';

import {setPixelatedImage} from '../../actions';

import Step3 from './index';

const mapStateToProps = ({sourceImage, pixelatedImage, pixelDimensions}) => ({
  sourceImage,
  pixelatedImage,
  pixelDimensions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPixelatedImage: (pixelatedImage) => {
      dispatch(setPixelatedImage(pixelatedImage));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);

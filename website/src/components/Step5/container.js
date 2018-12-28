import {connect} from 'react-redux';

import {setPrimeImage} from '../../actions';

import Step5 from './index';

const mapStateToProps = ({digitMappings, pixelatedImage, pixelDimensions}) => ({
  digitMappings,
  pixelatedImage,
  pixelDimensions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPrimeImage: (primeImage) => {
      dispatch(setPrimeImage(primeImage));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5);

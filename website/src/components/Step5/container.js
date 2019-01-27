import {connect} from 'react-redux';

import {setPrimeImage, setStateFromFirestore} from '../../actions';

import Step5 from './index';

const mapStateToProps = ({
  postId,
  primeImage,
  sourceImage,
  digitMappings,
  pixelatedImage,
  pixelDimensions,
}) => ({
  postId,
  primeImage,
  sourceImage,
  digitMappings,
  pixelatedImage,
  pixelDimensions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPrimeImage: (primeImage) => {
      dispatch(setPrimeImage(primeImage));
    },
    setStateFromFirestore: (payload) => {
      dispatch(setStateFromFirestore(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5);

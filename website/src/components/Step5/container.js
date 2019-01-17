import {connect} from 'react-redux';

import {setPrimeImage, setStateFromFirestore} from '../../actions';

import Step5 from './index';

const mapStateToProps = ({
  sourceImage,
  primeImageId,
  digitMappings,
  pixelatedImage,
  pixelDimensions,
}) => ({
  sourceImage,
  primeImageId,
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

import {connect} from 'react-redux';

import {setPrimeImage, setStateFromFirestore} from '../../store/actions';

import Step5 from './index';

const mapStateToProps = ({app}) => ({
  postId: app.postId,
  primeImage: app.primeImage,
  sourceImage: app.sourceImage,
  digitMappings: app.digitMappings,
  pixelatedImage: app.pixelatedImage,
  pixelDimensions: app.pixelDimensions,
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

export default connect(mapStateToProps, mapDispatchToProps)(Step5);

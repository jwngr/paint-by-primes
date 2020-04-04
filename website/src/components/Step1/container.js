import {connect} from 'react-redux';

import {setSourceImage} from '../../store/actions';

import Step1 from './index';

const mapDispatchToProps = (dispatch) => {
  return {
    setSourceImage: (sourceImage) => {
      dispatch(setSourceImage(sourceImage));
    },
  };
};

export default connect(null, mapDispatchToProps)(Step1);

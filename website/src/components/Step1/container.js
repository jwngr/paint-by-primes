import {connect} from 'react-redux';

import {setSourceImage} from '../../actions';

import Step1 from './index';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    setSourceImage: (sourceImage) => {
      dispatch(setSourceImage(sourceImage));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step1);

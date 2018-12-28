import {connect} from 'react-redux';

import {setCurrentStep} from '../../../actions';

import SidebarStep from './index';

const mapStateToProps = ({currentStep, latestCompletedStep}) => ({
  currentStep,
  latestCompletedStep,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentStep: (step, latestCompletedStep) => {
      if (step <= latestCompletedStep) {
        dispatch(setCurrentStep(step));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarStep);

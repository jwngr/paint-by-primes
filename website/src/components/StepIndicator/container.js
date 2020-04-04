import {connect} from 'react-redux';

import {setCurrentStep} from '../../store/actions';

import SidebarStep from './index';

const mapStateToProps = ({app}) => ({
  currentStep: app.currentStep,
  latestCompletedStep: app.latestCompletedStep,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentStep: (step) => {
      dispatch(setCurrentStep(step));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarStep);

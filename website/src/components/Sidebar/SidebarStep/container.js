import {connect} from 'react-redux';

import SidebarStep from './index';

const mapStateToProps = ({currentStep, latestCompletedStep}) => ({
  currentStep,
  latestCompletedStep,
});

export default connect(mapStateToProps)(SidebarStep);

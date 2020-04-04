import {connect} from 'react-redux';

import SidebarStep from './index';

const mapStateToProps = ({app}) => ({
  currentStep: app.currentStep,
  latestCompletedStep: app.latestCompletedStep,
});

export default connect(mapStateToProps)(SidebarStep);

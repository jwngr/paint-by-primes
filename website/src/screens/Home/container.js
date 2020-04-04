import {connect} from 'react-redux';

import HomeScreen from './index';

const mapStateToProps = ({app}) => ({
  currentStep: app.currentStep,
  latestCompletedStep: app.latestCompletedStep,
});

export default connect(mapStateToProps)(HomeScreen);

import {connect} from 'react-redux';

import HomeScreen from './index';

const mapStateToProps = ({currentStep, latestCompletedStep}) => ({
  currentStep,
  latestCompletedStep,
});

export default connect(mapStateToProps)(HomeScreen);

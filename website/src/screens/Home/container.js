import {connect} from 'react-redux';

import HomeScreen from './index';

const mapStateToProps = ({currentStep}) => ({currentStep});

export default connect(mapStateToProps)(HomeScreen);

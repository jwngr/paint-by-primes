import {connect} from 'react-redux';

import StepDetails from './index';

const mapStateToProps = ({app}) => ({
  sourceImage: app.sourceImage,
  digitMappings: app.digitMappings,
  pixelatedImage: app.pixelatedImage,
  pixelDimensions: app.pixelDimensions,
});

export default connect(mapStateToProps)(StepDetails);

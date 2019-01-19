import {connect} from 'react-redux';

import StepDetails from './index';

const mapStateToProps = ({sourceImage, digitMappings, pixelatedImage, pixelDimensions}) => ({
  sourceImage,
  digitMappings,
  pixelatedImage,
  pixelDimensions,
});

export default connect(mapStateToProps)(StepDetails);

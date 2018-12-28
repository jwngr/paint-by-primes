import {connect} from 'react-redux';

import Sidebar from './index';

const mapStateToProps = ({sourceImage, digitMappings, pixelatedImage, pixelDimensions}) => ({
  sourceImage,
  digitMappings,
  pixelatedImage,
  pixelDimensions,
});

export default connect(mapStateToProps)(Sidebar);

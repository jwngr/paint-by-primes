import _ from 'lodash';
import React from 'react';

import {SIDEBAR_WIDTH_PX, IMAGE_BORDER_WIDTH_PX} from '../resources/constants';

export default (WrapperComponent) => {
  class MaxImageDimensionsComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.debouncedResize = _.debounce(this.resize.bind(this), 350);

      window.addEventListener('resize', this.debouncedResize);

      this.state = {
        maxImageDimensions: {
          width: this.getMaxImageWidth(),
          height: this.getMaxImageHeight(),
        },
      };
    }

    resize() {
      this.setState({
        maxImageDimensions: {
          width: this.getMaxImageWidth(),
          height: this.getMaxImageHeight(),
        },
      });
    }

    getMaxImageWidth = () => {
      const windowWidth = window.innerWidth;
      const paddingWidth = 2 * 12;
      const borderWidth = 2 * IMAGE_BORDER_WIDTH_PX;

      if (windowWidth > 768) {
        return windowWidth - paddingWidth - borderWidth - SIDEBAR_WIDTH_PX;
      } else {
        return windowWidth - paddingWidth - borderWidth;
      }
    };

    getMaxImageHeight = () => {
      const windowHeight = window.innerHeight;
      const paddingHeight = 2 * 12;
      const borderHeight = 2 * 6;

      return windowHeight - paddingHeight - borderHeight;
    };

    render() {
      return <WrapperComponent {...this.state} {...this.props} />;
    }
  }

  return MaxImageDimensionsComponent;
};

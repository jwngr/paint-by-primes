import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {LoadingIndicatorCell, LoadingIndicatorWrapper} from './index.styles';

const CELL_COUNT = 100;
const DEFAULT_HEX_VALUES = ['#005533', '#A6134B', '#B05F38', '#45513A', '#0A52A7'];
const DEFAULT_DIGIT_MAPPINGS = {
  hexValuesToDigits: {'#005533': 8, '#A6134B': 1, '#B05F38': 6, '#45513A': 7, '#0A52A7': 3},
};

class LoadingIndicator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.updateCellIntervals = [];

    const cellHexValues = _.range(0, 100).map(this.getRandomHexValue);

    this.currentCellIndex = 0;
    this.updateCellHexValuesInterval = setInterval(() => {
      this.setState(({cellHexValues}) => {
        const updatedCellHexValues = _.clone(cellHexValues);
        // TODO: update
        this.currentCellIndex = _.sample(_.range(0, 100));
        updatedCellHexValues[this.currentCellIndex] = this.getRandomHexValue();
        this.currentCellIndex = (this.currentCellIndex + 1) % CELL_COUNT;
        return {
          cellHexValues: updatedCellHexValues,
        };
      });
    }, 5);

    this.state = {
      cellHexValues,
    };
  }

  componentWillUnmount() {
    clearInterval(this.updateCellHexValuesInterval);
  }

  getRandomHexValue = () => {
    const {pixelatedImage} = this.props;
    const hexValues = _.uniq(pixelatedImage ? pixelatedImage.hexValues : DEFAULT_HEX_VALUES);
    return _.sample(hexValues);
  };

  render() {
    const {cellHexValues} = this.state;
    const {digitMappings} = this.props;

    return (
      <LoadingIndicatorWrapper>
        {cellHexValues.map((cellHexValue) => {
          return (
            <LoadingIndicatorCell hexValue={cellHexValue}>
              {(digitMappings || DEFAULT_DIGIT_MAPPINGS).hexValuesToDigits[cellHexValue]}
            </LoadingIndicatorCell>
          );
        })}
      </LoadingIndicatorWrapper>
    );
  }
}

LoadingIndicator.propTypes = {
  digitMappings: PropTypes.object,
  pixelatedImage: PropTypes.object,
};

export default LoadingIndicator;

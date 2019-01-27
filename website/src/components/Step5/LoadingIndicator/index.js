import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {LoadingIndicatorCell, LoadingIndicatorWrapper} from './index.styles';

import {colors} from '../../../resources/theme.json';

const CELL_COUNT = 100;
const DEFAULT_HEX_VALUES = [
  colors.green.medium,
  colors.red.medium,
  colors.blue.medium,
  colors.orange.medium,
];
const DEFAULT_DIGIT_MAPPINGS = {
  hexValuesToDigits: {
    [colors.green.medium]: 8,
    [colors.red.medium]: 1,
    [colors.blue.medium]: 6,
    [colors.orange.medium]: 7,
  },
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
        {cellHexValues.map((cellHexValue, i) => {
          return (
            <LoadingIndicatorCell hexValue={cellHexValue} key={`loading-indicator-cell-${i}`}>
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

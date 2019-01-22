import _ from 'lodash';
import React from 'react';

import {LoadingIndicatorCell, LoadingIndicatorWrapper} from './index.styles';

const INITIAL_CELL_VALUES = ['P', 'R', 'I', 'M', 'E', 'P', 'I', 'C', 'S'];

// TODO: delete this file

class LoadingIndicator extends React.PureComponent {
  state = {
    cells: INITIAL_CELL_VALUES,
  };

  componentDidMount() {
    this.intervals = [];

    _.map(INITIAL_CELL_VALUES, (cellValue, i) => {
      // Offset each cell change by 100 milliseconds.
      return setTimeout(() => {
        this.intervals.push(
          setInterval(() => {
            this.setState(({cells}) => {
              const updatedCells = _.clone(cells);
              const cellToUpdateNumericValue = Number(updatedCells[i]);
              if (_.isNaN(cellToUpdateNumericValue)) {
                updatedCells[i] = 0;
              } else if (cellToUpdateNumericValue === 9) {
                updatedCells[i] = INITIAL_CELL_VALUES[i];
              } else {
                updatedCells[i] += 1;
              }

              return {
                cells: updatedCells,
              };
            });
          }, 500)
        );
      }, i * 900);
    });
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval);
  }

  render() {
    const {cells} = this.state;

    return (
      <LoadingIndicatorWrapper>
        {cells.map((cellValue) => {
          return <LoadingIndicatorCell>{cellValue}</LoadingIndicatorCell>;
        })}
      </LoadingIndicatorWrapper>
    );
  }
}

export default LoadingIndicator;

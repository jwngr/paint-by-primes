import React from 'react';

import {CardBody, CardInstruction} from '../../Card';
import CardValueSection from '../../Card/CardValueSection';

import {ProgressCardWrapper} from './index.styles';

import {getNumberWithCommas, getFormattedTimeFromSeconds} from '../../../lib/utils';

class ProgressCard extends React.PureComponent {
  state = {
    elapsedTime: 0,
    numbersCheckedCount: 0,
  };

  componentDidMount() {
    const numbersCheckedPerSecond = 25;

    this.elapsedTimeInterval = setInterval(() => {
      this.setState(({elapsedTime}) => ({
        elapsedTime: elapsedTime + 1,
        // TODO: make this more accurate depending on the length of the prime image.
        // numbersCheckedCount: numbersCheckedCount + _.random(20, 25),
      }));
    }, 1000);

    this.numbersCheckedCountInterval = setInterval(() => {
      this.setState(({numbersCheckedCount}) => ({
        numbersCheckedCount: numbersCheckedCount + 1,
      }));
    }, 1000 / numbersCheckedPerSecond);
  }

  componentWillUnmount() {
    clearInterval(this.elapsedTimeInterval);
    clearInterval(this.numbersCheckedCountInterval);
  }

  render() {
    const {elapsedTime, numbersCheckedCount} = this.state;

    return (
      <ProgressCardWrapper>
        <CardInstruction>
          It may take several minutes to evaluate numbers until a prime is found.
        </CardInstruction>
        <CardBody>
          <CardValueSection title="Elapsed Time" value={getFormattedTimeFromSeconds(elapsedTime)} />
          <CardValueSection
            title="Numbers Evaluated"
            value={getNumberWithCommas(numbersCheckedCount)}
          />
        </CardBody>
      </ProgressCardWrapper>
    );
  }
}

export default ProgressCard;

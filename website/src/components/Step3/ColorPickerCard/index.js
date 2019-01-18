import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {CardBody, CardInstruction} from '../../Card';

import {ColorPicker, ColorPickerCardWrapper} from './index.styles';

class ColorPickerCard extends React.PureComponent {
  render() {
    const {hexValues, selectedSwatchIndex, changeSelectedSwatchHexValue} = this.props;

    return (
      <ColorPickerCardWrapper>
        <CardInstruction>
          Use the color picker below to change the color of the selected swatch above.
        </CardInstruction>
        <CardBody>
          <ColorPicker
            color={hexValues[selectedSwatchIndex]}
            disableAlpha={true}
            presetColors={_.uniq(hexValues)}
            onChangeComplete={(color) => changeSelectedSwatchHexValue(color.hex)}
          />
        </CardBody>
      </ColorPickerCardWrapper>
    );
  }
}

ColorPickerCard.propTypes = {
  hexValues: PropTypes.array.isRequired,
  selectedSwatchIndex: PropTypes.number.isRequired,
  changeSelectedSwatchHexValue: PropTypes.func.isRequired,
};

export default ColorPickerCard;

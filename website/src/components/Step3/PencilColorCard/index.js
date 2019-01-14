import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {CardBody, CardInstruction} from '../../Card';

import {
  PencilIcon,
  PencilColorSwatch,
  PencilColorCardWrapper,
  PencilColorSwatchWrapper,
  PencilColorSwatchesWrapper,
  EmptyPencilColorSwatchWrapper,
} from './index.styles';

class PencilColorCard extends React.PureComponent {
  render() {
    const {hexValues, selectedImageEditorHexValue, changeSelectedImageEditorHexValue} = this.props;

    return (
      <PencilColorCardWrapper>
        <CardInstruction>
          Click on a pixel in the image to the right to change it to the selected color below.
        </CardInstruction>
        <CardBody>
          <PencilColorSwatchesWrapper>
            {_.uniq(hexValues).map((hexValue) => {
              const isSelected = hexValue === selectedImageEditorHexValue;
              return (
                <PencilColorSwatchWrapper key={`pen-color-swatch-${hexValue.replace('#', '')}`}>
                  <PencilColorSwatch
                    hexValue={hexValue}
                    isSelected={isSelected}
                    onClick={() => changeSelectedImageEditorHexValue(hexValue)}
                  >
                    {isSelected && (
                      <PencilIcon viewBox="0 0 32 32" hexValue={hexValue}>
                        <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
                      </PencilIcon>
                    )}
                  </PencilColorSwatch>
                </PencilColorSwatchWrapper>
              );
            })}
            {_.range(0, 10 - hexValues.length).map((i) => (
              <EmptyPencilColorSwatchWrapper key={`empty-pen-color-swatch-wrapper-${i}`} />
            ))}
          </PencilColorSwatchesWrapper>
        </CardBody>
      </PencilColorCardWrapper>
    );
  }
}

PencilColorCard.propTypes = {
  hexValues: PropTypes.array.isRequired,
  selectedImageEditorHexValue: PropTypes.string.isRequired,
  changeSelectedImageEditorHexValue: PropTypes.func.isRequired,
};

export default PencilColorCard;

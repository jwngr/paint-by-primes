import _ from 'lodash';
import React from 'react';

import {getNumberWithCommas} from '../../lib/utils';

import Logo from '../Logo';
import SidebarStep from './SidebarStep/container';

import {
  Swatch,
  LogoWrapper,
  StepDetails,
  SourceImage,
  SidebarWrapper,
  ImageDimensions,
  SwatchesWrapper,
} from './index.styles';

class Sidebar extends React.Component {
  render() {
    const {sourceImage, pixelatedImage, pixelDimensions, digitMappings} = this.props;

    return (
      <SidebarWrapper>
        <LogoWrapper>
          <Logo width={120} height={120} borderWidth={4} />
        </LogoWrapper>
        <div>
          <SidebarStep
            step={1}
            detailsContent={
              sourceImage && (
                <StepDetails className="step-details">
                  <SourceImage
                    src={sourceImage.fileUrl}
                    alt={'Source thumbnail'}
                    width={sourceImage.width}
                    height={sourceImage.height}
                  />
                </StepDetails>
              )
            }
          />

          <SidebarStep
            step={2}
            detailsContent={
              pixelDimensions && (
                <StepDetails className="step-details">
                  <ImageDimensions>
                    <p>
                      {getNumberWithCommas(Math.ceil(sourceImage.width / pixelDimensions.width))}{' '}
                      &times;{' '}
                      {getNumberWithCommas(Math.ceil(sourceImage.height / pixelDimensions.height))}
                    </p>
                    <p>
                      {getNumberWithCommas(
                        Math.ceil(sourceImage.width / pixelDimensions.width) *
                          Math.ceil(sourceImage.height / pixelDimensions.height)
                      )}{' '}
                      digits
                    </p>
                  </ImageDimensions>
                </StepDetails>
              )
            }
          />

          <SidebarStep
            step={3}
            detailsContent={
              pixelatedImage && (
                <StepDetails className="step-details">
                  <SwatchesWrapper>
                    {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
                      <Swatch
                        hexValue={hexValue}
                        key={`step3-swatch-${hexValue.replace('#', '')}`}
                      />
                    ))}
                  </SwatchesWrapper>
                </StepDetails>
              )
            }
          />

          <SidebarStep
            step={4}
            detailsContent={
              digitMappings && (
                <StepDetails className="step-details">
                  <SwatchesWrapper>
                    {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
                      <Swatch hexValue={hexValue} key={`step4-swatch-${hexValue.replace('#', '')}`}>
                        {digitMappings.hexValuesToDigits[hexValue]}
                      </Swatch>
                    ))}
                  </SwatchesWrapper>
                </StepDetails>
              )
            }
          />

          <SidebarStep step={5} detailsContent={<StepDetails className="step-details" />} />
        </div>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;

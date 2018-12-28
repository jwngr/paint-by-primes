import _ from 'lodash';
import React from 'react';
import {darken} from 'polished';

import {getNumberWithCommas} from '../../lib/utils';

import Logo from '../Logo';
import SidebarStep from './SidebarStep/container';

import {Swatch, LogoWrapper, StepDetails, SourceImage, SidebarWrapper} from './index.styles';

class Sidebar extends React.Component {
  render() {
    const {sourceImage, pixelatedImage, pixelDimensions, digitMappings} = this.props;

    return (
      <SidebarWrapper>
        <LogoWrapper>
          <Logo fontSize="28px" />
        </LogoWrapper>
        <div>
          <SidebarStep
            step={1}
            description={'Choose source image'}
            detailsContent={
              sourceImage && (
                <StepDetails className="step-details">
                  <SourceImage
                    src={sourceImage.file}
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
            description={'Set target dimensions'}
            detailsContent={
              pixelDimensions && (
                <StepDetails className="step-details">
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
                    pixels
                  </p>
                </StepDetails>
              )
            }
          />

          <SidebarStep
            step={3}
            description={'Edit colors'}
            detailsContent={
              pixelatedImage && (
                <StepDetails className="step-details">
                  {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
                    <Swatch
                      key={`step3-swatch-${hexValue.replace('#', '')}`}
                      style={{
                        backgroundColor: hexValue,
                        border: `solid 2px ${darken(0.2, hexValue)}`,
                      }}
                    />
                  ))}
                </StepDetails>
              )
            }
          />

          <SidebarStep
            step={4}
            description={'Assign digits'}
            detailsContent={
              digitMappings && (
                <StepDetails className="step-details">
                  {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
                    <div
                      className="swatch"
                      key={`step4-swatch-${hexValue.replace('#', '')}`}
                      style={{
                        backgroundColor: hexValue,
                        border: `solid 2px ${darken(0.2, hexValue)}`,
                      }}
                    >
                      {digitMappings.hexValuesToDigits[hexValue]}
                    </div>
                  ))}
                </StepDetails>
              )
            }
          />

          <SidebarStep
            step={5}
            description={'Generate prime image'}
            detailsContent={<StepDetails className="step-details" />}
          />
        </div>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;

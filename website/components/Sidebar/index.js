import _ from 'lodash';
import {darken} from 'polished';
import classNames from 'classnames';

import {withStore} from '../../Store';
import {getNumberWithCommas} from '../../utils';

import Logo from '../Logo';
import Button from '../Button';

import colors from '../../resources/colors.json';

const getStepClassNames = (step, currentStep, latestValidStep) => {
  return classNames({
    step: true,
    selected: step === currentStep,
    completed: step < latestValidStep,
    upcoming: step > latestValidStep,
  });
};

class Sidebar extends React.Component {
  render() {
    const {
      currentStep,
      sourceImage,
      latestValidStep,
      pixelDimensions,
      pixelatedImage,
      setCurrentStep,
      hexValuesToDigits,
    } = this.props;

    return (
      <React.Fragment>
        <div className="sidebar">
          <div className="logo-wrapper">
            <Logo fontSize="28px" />
          </div>
          <div>
            <div
              className={getStepClassNames(1, currentStep, latestValidStep)}
              onClick={() => setCurrentStep(1)}
            >
              <div className="step-header">
                <div className="step-index">
                  <div className="step-index-item">
                    <div className="step-index-checkmark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        {currentStep > 1 ? (
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        ) : (
                          <circle r="10" cx="50%" cy="50%" />
                        )}
                      </svg>
                    </div>
                    <div className="step-index-digit">
                      <p>1</p>
                    </div>
                  </div>
                  <div className="goo-blob-container">
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                  </div>
                </div>
                <p className="step-description">Choose source image</p>
              </div>
              {sourceImage && (
                <div className="step-details">
                  <img
                    className="source-image"
                    src={sourceImage.file}
                    alt={'Source image thumbnail'}
                  />
                </div>
              )}
            </div>

            <div
              className={getStepClassNames(2, currentStep, latestValidStep)}
              onClick={() => setCurrentStep(2)}
            >
              <div className="step-header">
                <div className="step-index">
                  <div className="step-index-item">
                    <div className="step-index-checkmark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        {currentStep > 2 ? (
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        ) : (
                          <circle r="10" cx="50%" cy="50%" />
                        )}
                      </svg>
                    </div>
                    <div className="step-index-digit">
                      <p>2</p>
                    </div>
                  </div>
                  <div className="goo-blob-container">
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                  </div>
                </div>
                <p className="step-description">Set target dimensions</p>
              </div>
              {pixelDimensions && latestValidStep > 2 && (
                <div className="step-details">
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
                </div>
              )}
            </div>

            <div
              className={getStepClassNames(3, currentStep, latestValidStep)}
              onClick={() => setCurrentStep(3)}
            >
              <div className="step-header">
                <div className="step-index">
                  <div className="step-index-item">
                    <div className="step-index-checkmark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        {currentStep > 3 ? (
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        ) : (
                          <circle r="10" cx="50%" cy="50%" />
                        )}
                      </svg>
                    </div>
                    <div className="step-index-digit">
                      <p>3</p>
                    </div>
                  </div>
                  <div className="goo-blob-container">
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                  </div>
                </div>
                <p className="step-description">Edit colors</p>
              </div>
              {pixelatedImage && latestValidStep > 3 && (
                <div className="step-details">
                  {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
                    <div
                      className="swatch"
                      key={`step3-swatch-${hexValue.replace('#', '')}`}
                      style={{
                        backgroundColor: hexValue,
                        border: `solid 2px ${darken(0.2, hexValue)}`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              className={getStepClassNames(4, currentStep, latestValidStep)}
              onClick={() => setCurrentStep(4)}
            >
              <div className="step-header">
                <div className="step-index">
                  <div className="step-index-item">
                    <div className="step-index-checkmark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        {currentStep > 4 ? (
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        ) : (
                          <circle r="10" cx="50%" cy="50%" />
                        )}
                      </svg>
                    </div>
                    <div className="step-index-digit">
                      <p>4</p>
                    </div>
                  </div>
                  <div className="goo-blob-container">
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                  </div>
                </div>
                <p className="step-description">Assign digits</p>
              </div>
              {hexValuesToDigits && latestValidStep > 4 && (
                <div className="step-details">
                  {_.uniq(pixelatedImage.hexValues).map((hexValue) => (
                    <div
                      className="swatch"
                      key={`step4-swatch-${hexValue.replace('#', '')}`}
                      style={{
                        backgroundColor: hexValue,
                        border: `solid 2px ${darken(0.2, hexValue)}`,
                      }}
                    >
                      {hexValuesToDigits[hexValue]}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className={getStepClassNames(5, currentStep, latestValidStep)}
              onClick={() => setCurrentStep(5)}
            >
              <div className="step-header">
                <div className="step-index">
                  <div className="step-index-item">
                    <div className="step-index-checkmark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        {currentStep > 5 ? (
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        ) : (
                          <circle r="10" cx="50%" cy="50%" />
                        )}
                      </svg>
                    </div>
                    <div className="step-index-digit">
                      <p>5</p>
                    </div>
                  </div>
                  <div className="goo-blob-container">
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                    <div className="goo-blob" />
                  </div>
                </div>
                <p className="step-description">Generate prime image</p>
              </div>
              <div className="step-details" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .sidebar {
            width: 260px;
            height: 100vh;
            position: fixed;
            padding-left: 12px;
            padding-top: 20px;
          }

          .logo-wrapper {
            margin-bottom: 28px;
          }

          .step {
            height: 120px;
            display: flex;
            flex-direction: column;
          }

          .step-index::before {
            content: '';
            position: absolute;
            transition: background 0.6s;
          }

          .step:not(:first-of-type) .step-index::before {
            top: -74px;
            left: 17px;
            width: 6px;
            height: 68px;
            background-color: ${colors.gray.medium};
          }

          .step.selected .step-index::before {
            background-color: ${colors.moss.darkest};
          }

          .step.completed .step-index::before {
            background-color: ${colors.moss.darkest};
          }

          .step:hover .step-index {
            cursor: default;
          }

          .step.completed:hover {
            cursor: pointer;
          }

          .step-header {
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 12px;
          }

          .step-details {
            flex: 1;
            display: flex;
            margin-top: -12px;
            margin-left: 32px;
            text-align: center;
            align-items: center;
            justify-content: center;
          }

          .step-index {
            position: relative;
            font-size: 20px;
            font-weight: bold;
            width: 52px;
            height: 52px;
            margin-right: 8px;
            border-radius: 60px;
            color: ${colors.gray.medium};
            border: solid 6px ${colors.gray.medium};
            background-color: ${colors.gray.lighter};
            transition: all 0.6s;
          }

          .step-index-item {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .step-index-item > div {
            width: 100%;
            height: 100%;
            z-index: 51;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s;
            transform: translate3d(0, 0, 0);
          }

          .step.upcoming .step-index-item > div {
            transform: translate3d(0, -100%, 0);
          }

          .step.completed.selected .step-index-item > div {
            transform: translate3d(0, 0, 0);
          }

          .step:hover .step-index-item > div {
            fill: ${colors.moss.lightest};
            color: ${colors.moss.lightest};
            stroke: ${colors.moss.lightest};
          }

          .step:not(.upcoming):hover .step-index-item > div {
            cursor: pointer;
            transform: translate3d(0, -100%, 0);
          }

          .step .step-index svg {
            fill: ${colors.gray.medium};
            stroke: ${colors.gray.medium};
            transition: fill 0.6s, stroke 0.6s;
          }

          .step.completed .step-index svg {
            fill: ${colors.moss.darkest};
            stroke: ${colors.moss.darkest};
          }

          .step.selected .step-index svg {
            fill: ${colors.peach.darker};
            stroke: ${colors.peach.darker};
          }

          .step.completed .step-index {
            color: ${colors.moss.darkest};
            background-color: ${colors.moss.medium};
            border-color: ${colors.moss.darkest};
          }

          .step.selected .step-index {
            color: ${colors.peach.darker};
            background-color: ${colors.peach.lighter};
            border-color: ${colors.peach.darker};
          }

          .step-description {
            font-size: 16px;
            font-weight: bold;
            color: ${colors.gray.medium};
            transition: color 0.6s;
          }

          .step.completed .step-description {
            color: ${colors.moss.darkest};
          }

          .step.selected .step-description {
            color: ${colors.peach.darker};
          }

          .source-image {
            margin: auto;
            width: ${sourceImage ? (64 / sourceImage.height) * sourceImage.width : 0}px;
            height: 64px;
          }

          .step:nth-of-type(2) .step-details {
            flex-direction: column;
          }

          .step:nth-of-type(2) .step-details p:first-of-type {
            margin-bottom: 8px;
          }

          .step:nth-of-type(3) .step-details,
          .step:nth-of-type(4) .step-details {
            flex-wrap: wrap;
            flex-direction: row;
          }

          .swatch {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            opacity: 0.5;
            margin: 4px 8px;
            user-select: none;
            font-size: 8px;
          }

          .goo-blob-container {
            position: absolute;
            overflow: hidden;
            top: -3px;
            left: -1px;
            bottom: -3px;
            right: -1px;
            z-index: 50;
            border-radius: 100%;
            opacity: 1;
          }

          .goo-blob {
            z-index: -1;
            opacity: 1;
            display: block;
            position: absolute;
            width: 80%;
            height: 80%;
            border-radius: 100%;
            background-color: ${colors.gray.medium};
            transition: transform 0.8s, background-color 0.4s;
          }

          .step.completed .goo-blob {
            background-color: ${colors.moss.darkest};
          }

          .step.selected .goo-blob {
            background-color: ${colors.peach.darker};
          }

          .goo-blob:nth-child(1) {
            transition-delay: 0ms;
            transform: scale(1.3) translate3d(0, -100%, 0);
          }

          .goo-blob:nth-child(2) {
            transition-delay: 125ms;
            transform: scale(1.3) translate3d(-100%, 100%, 0);
          }

          .goo-blob:nth-child(3) {
            transition-delay: 60ms;
            transform: scale(1.3) translate3d(100%, 100%, 0);
          }

          .step:hover .goo-blob:nth-child(1) {
            transition-delay: 0ms;
          }

          .step:hover .goo-blob:nth-child(2) {
            transition-delay: 100ms;
          }

          .step:hover .goo-blob:nth-child(3) {
            transition-delay: 50ms;
          }

          .step:hover .goo-blob:nth-child(1) {
            transform: scale(1.4) translate3d(0, 0, 0);
          }

          .step:hover .goo-blob:nth-child(2) {
            transform: scale(1.4) translate3d(0, 0, 0) rotate(25deg);
          }

          .step:hover .goo-blob:nth-child(3) {
            transform: scale(1.6) translate3d(0, 0, 0);
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Sidebar);

import _ from 'lodash';
import {darken} from 'polished';
import classNames from 'classnames';

import {withStore} from '../../Store';

import colors from '../../resources/colors.json';

const getStepClassNames = (step, currentStep) => {
  return classNames({
    step: true,
    selected: step === currentStep,
    completed: step < currentStep,
  });
};

class Sidebar extends React.Component {
  render() {
    const {
      currentStep,
      sourceImage,
      pixelDimensions,
      pixelatedImage,
      setCurrentStep,
      hexValuesToDigits,
    } = this.props;

    return (
      <React.Fragment>
        <div className="sidebar">
          <div className={getStepClassNames(1, currentStep)} onClick={() => setCurrentStep(1)}>
            <div className="step-header">
              <div className="step-index">
                {currentStep > 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                ) : (
                  <p>1</p>
                )}
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

          <div className={getStepClassNames(2, currentStep)} onClick={() => setCurrentStep(2)}>
            <div className="step-header">
              <div className="step-index">
                {currentStep > 2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                ) : (
                  <p>2</p>
                )}
              </div>
              <p className="step-description">Set pixel dimensions</p>
            </div>
            {pixelDimensions && (
              <div className="step-details">
                <p>
                  <b>Width:</b> {pixelDimensions.zoomedWidth}
                </p>
                <p>
                  <b>Height:</b> {pixelDimensions.zoomedHeight}
                </p>
              </div>
            )}
          </div>

          <div className={getStepClassNames(3, currentStep)} onClick={() => setCurrentStep(3)}>
            <div className="step-header">
              <div className="step-index">
                {currentStep > 3 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                ) : (
                  <p>3</p>
                )}
              </div>
              <p className="step-description">Edit colors</p>
            </div>
            {pixelatedImage && (
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

          <div className={getStepClassNames(4, currentStep)} onClick={() => setCurrentStep(4)}>
            <div className="step-header">
              <div className="step-index">
                {currentStep > 4 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                ) : (
                  <p>4</p>
                )}
              </div>
              <p className="step-description">Assign digits</p>
            </div>
            {hexValuesToDigits && (
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

          <div className={getStepClassNames(5, currentStep)} onClick={() => setCurrentStep(5)}>
            <div className="step-header">
              {currentStep > 5 ? (
                <svg
                  className="step-index"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                </svg>
              ) : (
                <div className="step-index">
                  <p>5</p>
                </div>
              )}
              <p className="step-description">Generate prime image</p>
            </div>
            <div className="step-details" />
          </div>
        </div>

        <style jsx>{`
          .sidebar {
            width: 240px;
            height: 100vh;
            position: fixed;
            padding-left: 12px;
            padding-top: 20px;
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
            top: -84px;
            left: 15px;
            width: 4px;
            height: 80px;
            background: linear-gradient(${colors.gray.medium}, ${colors.gray.medium});
          }

          .step.completed .step-index::before {
            background: linear-gradient(${colors.forest.darkest}, ${colors.forest.darkest});
          }

          .step.selected .step-index::before {
            background: linear-gradient(${colors.forest.darkest}, ${colors.peach.darker});
          }

          .step.selected + .step .step-index::before {
            background: linear-gradient(${colors.peach.darker}, ${colors.gray.medium});
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
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            width: 40px;
            height: 40px;
            margin-right: 8px;
            border-radius: 40px;
            color: ${colors.gray.medium};
            border: solid 4px ${colors.gray.medium};
            background-color: ${colors.gray.lighter};
            transition: color 0.6s, border 0.6s, background-color 0.6s;
          }

          .step-index path {
            fill: ${colors.forest.darkest};
            stroke: ${colors.forest.darkest};
            transition: fill 0.6s, stroke 0.6s;
          }

          .step.selected .step-index {
            color: ${colors.peach.darker};
            background-color: ${colors.peach.lighter};
            border-color: ${colors.peach.darker};
          }

          .step.completed .step-index {
            color: ${colors.forest.darkest};
            background-color: ${colors.forest.medium};
            border-color: ${colors.forest.darkest};
          }

          .step.completed:hover .step-index {
            color: ${colors.peach.darker};
            border-color: ${colors.peach.darker};
            background-color: ${colors.peach.medium};
          }

          .step.completed:hover .step-index path {
            fill: ${colors.peach.darker};
            stroke: ${colors.peach.darker};
          }

          .step-description {
            font-size: 16px;
            color: ${colors.gray.medium};
            transition: color 0.6s;
          }

          .step.selected .step-description {
            color: ${colors.peach.darker};
          }

          .step.completed .step-description {
            color: ${colors.forest.darkest};
          }

          .step.completed:hover .step-index path {
            fill: ${colors.peach.darkest};
            stroke: ${colors.peach.darkest};
          }

          .step.completed:hover .step-description {
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
            width: 20px;
            height: 20px;
            opacity: 0.5;
            margin: 4px 8px;
            user-select: none;
            font-size: 8px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Sidebar);

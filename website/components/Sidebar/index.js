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
    const {currentStep, sourceImage, pixelDimensions, pixelatedImage, setCurrentStep} = this.props;

    return (
      <React.Fragment>
        <div className="sidebar">
          <div className={getStepClassNames(1, currentStep)} onClick={() => setCurrentStep(1)}>
            <div className="step-header">
              <p className="step-index">1</p>
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
              <p className="step-index">2</p>
              <p className="step-description">Set pixel dimensions</p>
            </div>
            {pixelDimensions && (
              <div className="step-details">
                <p>
                  <b>Width:</b> {pixelDimensions.width}
                </p>
                <p>
                  <b>Height:</b> {pixelDimensions.height}
                </p>
              </div>
            )}
          </div>

          <div className={getStepClassNames(3, currentStep)} onClick={() => setCurrentStep(3)}>
            <div className="step-header">
              <p className="step-index">3</p>
              <p className="step-description">Edit colors</p>
            </div>
            <div className="step-details" />
          </div>

          <div className={getStepClassNames(4, currentStep)} onClick={() => setCurrentStep(4)}>
            <div className="step-header">
              <p className="step-index">4</p>
              <p className="step-description">Assign digits</p>
            </div>
            <div className="step-details" />
          </div>

          <div className={getStepClassNames(5, currentStep)} onClick={() => setCurrentStep(5)}>
            <div className="step-header">
              <p className="step-index">5</p>
              <p className="step-description">Generate prime image</p>
            </div>
            <div className="step-details" />
          </div>
        </div>

        <style jsx>{`
          .sidebar {
            width: 240px;
            height: 100vh;
            display: flex;
            position: fixed;
            flex-direction: column;
            background-color: ${colors.gray.lighter};
          }

          .step {
            flex: 1;
            padding: 12px;
            display: flex;
            flex-direction: column;
          }

          .step.selected {
            background-color: ${colors.peach.lighter};
          }

          .step.completed {
            background-color: ${colors.ocean.lighter};
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
            text-align: center;
          }

          .step-index {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            width: 40px;
            height: 40px;
            margin-right: 8px;
            border: solid 3px ${colors.darkBlue};
            border-radius: 40px;
            background-color: ${colors.white};
          }

          .step.selected .step-index {
            color: ${colors.peach.darker};
            background-color: ${colors.peach.lighter};
            border-color: ${colors.peach.darker};
          }

          .step.completed .step-index {
            color: ${colors.gray.darker};
            background-color: ${colors.gray.medium};
            border-color: ${colors.gray.darker};
          }

          .step.completed:hover .step-index {
            color: ${darken(0.2, colors.red)};
            background-color: ${colors.red};
            border-color: ${darken(0.2, colors.red)};
          }

          .step-description {
            font-size: 16px;
            color: ${colors.darkBlue};
          }

          .step.selected .step-description {
            color: ${colors.peach.darker};
          }

          .step.completed .step-description {
            color: ${colors.ocean.darker};
          }

          .step.completed:hover .step-description {
            color: ${darken(0.2, colors.red)};
          }

          .source-image {
            margin: auto;
            width: 40px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withStore(Sidebar);

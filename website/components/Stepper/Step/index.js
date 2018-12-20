import React from 'react';
import {darken} from 'polished';
import classNames from 'classnames';

import colors from '../../../resources/colors.json';

export default ({index, description, currentStepIndex, setCurrentStepIndex}) => {
  const stepClassNames = classNames({
    step: true,
    selected: index === currentStepIndex,
    completed: index < currentStepIndex,
  });

  let stepIndexContent;
  if (index < currentStepIndex) {
    stepIndexContent = (
      <svg
        className="step-index"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    );
  } else {
    stepIndexContent = <p className="step-index">{index}</p>;
  }

  return (
    <React.Fragment>
      <div className={stepClassNames} onClick={() => setCurrentStepIndex(index)}>
        {stepIndexContent}
        <p className="step-description">{description}</p>
      </div>

      <style jsx>{`
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 120px;
        }

        .step.completed:hover {
          cursor: pointer;
        }

        .step-index {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          width: 60px;
          height: 60px;
          margin-bottom: 12px;
          border: solid 3px ${colors.darkBlue};
          border-radius: 60px;
          background-color: ${colors.white};
        }

        .step.selected > .step-index {
          color: ${darken(0.2, colors.mediumBlue)};
          background-color: ${colors.mediumBlue};
          border-color: ${darken(0.2, colors.mediumBlue)};
        }

        .step.completed > .step-index {
          color: ${colors.gray.darker};
          background-color: ${colors.gray.medium};
          border-color: ${colors.gray.darker};
        }

        .step.completed:hover > .step-index {
          color: ${darken(0.2, colors.red)};
          background-color: ${colors.red};
          border-color: ${darken(0.2, colors.red)};
        }

        .step-description {
          flex: 1;
          display: flex;
          font-size: 16px;
          text-align: center;
          color: ${colors.darkBlue};
          align-items: center;
        }

        .step.selected > .step-description {
          color: ${darken(0.2, colors.mediumBlue)};
        }

        .step.completed > .step-description {
          color: ${colors.gray.darker};
        }

        .step.completed:hover > .step-description {
          color: ${darken(0.2, colors.red)};
        }
      `}</style>
    </React.Fragment>
  );
};

import classNames from 'classnames';

const getStepClassNames = (index, currentStep) => {
  return classNames({
    selected: index === currentStep,
    completed: index < currentStep,
  });
};

export default class Stepper extends React.Component {
  render() {
    const {currentStep, setCurrentStep} = this.props;

    return (
      <React.Fragment>
        <div className="stepper">
          <div className={getStepClassNames(1, currentStep)} onClick={() => setCurrentStep(1)}>
            <p>1</p>
            <p>Choose image</p>
          </div>
          <div className={getStepClassNames(2, currentStep)} onClick={() => setCurrentStep(2)}>
            <p>2</p>
            <p>Set pixel size</p>
          </div>
          <div className={getStepClassNames(3, currentStep)} onClick={() => setCurrentStep(3)}>
            <p>3</p>
            <p>Assign digits</p>
          </div>
          <div className={getStepClassNames(4, currentStep)} onClick={() => setCurrentStep(4)}>
            <p>4</p>
            <p>Personalize</p>
          </div>
          <div className={getStepClassNames(5, currentStep)}>
            <p>5</p>
            <p>View Result</p>
          </div>
        </div>
        <style jsx global>{`
          .stepper {
            width: 460px;
            margin: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            border: solid 1px red;
          }

          .stepper > div > p:first-of-type {
            font-size: 32px;
            font-weight: bold;
            width: 60px;
            height: 60px;
            line-height: 60px;
            margin: auto;
            border: solid 3px black;
            border-radius: 60px;
            text-align: center;
          }

          .stepper > div > p:last-of-type {
            font-size: 14px;
            text-align: center;
          }

          .selected {
            color: blue;
          }

          .stepper > div.selected > p:first-of-type {
            background-color: yellow;
            border-color: blue;
          }

          .completed {
            color: gray;
          }

          .stepper > div.completed > p:first-of-type {
            background-color: gray;
            color: white;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

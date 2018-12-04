import Link from 'next/link';

import Step1 from '../components/steps/Step1.js';
import Step2 from '../components/steps/Step2.js';
import Step3 from '../components/steps/Step3.js';
import Step4 from '../components/steps/Step4.js';
import Step5 from '../components/steps/Step5.js';
import Layout from '../components/Layout.js';
import Stepper from '../components/Stepper.js';

export default class Index extends React.Component {
  state = {
    step: 1,
    imageDetails: null,
  };

  setCurrenStep = (step) => {
    // Only go back to the current step if it has already been done.
    if (step < this.state.step) {
      this.setState({
        step,
      });
    }
  };

  goToNextStep = (imageDetails) => {
    this.setState({
      step: (this.state.step += 1),
      imageDetails,
    });
  };

  render() {
    const {step, imageDetails} = this.state;

    let stepContent;
    if (step === 1) {
      stepContent = <Step1 goToNextStep={this.goToNextStep} {...imageDetails} />;
    } else if (step === 2) {
      stepContent = <Step2 goToNextStep={this.goToNextStep} {...imageDetails} />;
    } else if (step === 3) {
      stepContent = <Step3 goToNextStep={this.goToNextStep} {...imageDetails} />;
    } else if (step === 4) {
      stepContent = <Step4 goToNextStep={this.goToNextStep} {...imageDetails} />;
    } else if (step === 5) {
      stepContent = <Step5 {...imageDetails} />;
    }

    return (
      <Layout>
        <h1>Prime Images</h1>
        <Stepper currentStep={step} setCurrentStep={this.setCurrenStep} />

        {stepContent}

        <style jsx>{`
          ul {
            padding: 0;
          }

          h1 {
            text-align: center;
            font-size: 40px;
            margin-top: 40px;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </Layout>
    );
  }
}

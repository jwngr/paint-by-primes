import Link from 'next/link';

import Step1 from '../components/steps/Step1';
import Step2 from '../components/steps/Step2';
import Step3 from '../components/steps/Step3';
import Step4 from '../components/steps/Step4';
import Step5 from '../components/steps/Step5';
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';

export default class Index extends React.Component {
  state = {
    step: 1,
    title: 'PRIME IMAGES',
    imageDetails: null,
  };

  setTitle = (title) => {
    this.setState({title});
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
    const {step, title, imageDetails} = this.state;

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
        <h1
          onMouseOver={() => this.setTitle('PR1M3 1MAG35')}
          onMouseOut={() => this.setTitle('PRIME IMAGES')}
        >
          {title}
        </h1>
        <h2>Every image has its prime.</h2>
        <Stepper currentStep={step} setCurrentStep={this.setCurrenStep} />

        {stepContent}

        <style jsx>{`
          ul {
            padding: 0;
          }

          h1 {
            text-align: center;
            font-size: 80px;
            margin: 12px 0;
            font-family: 'Roboto Mono', monospace;
          }

          h2 {
            text-align: center;
            font-size: 24px;
            font-weight: normal;
            margin: 12px auto 28px auto;
          }
        `}</style>
      </Layout>
    );
  }
}

import {withRouter} from 'next/router';

import Logo from '../components/Logo';
import Step1 from '../components/steps/Step1';
import Step2 from '../components/steps/Step2';
import Step3 from '../components/steps/Step3';
import Step4 from '../components/steps/Step4';
import Step5 from '../components/steps/Step5';
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';
import Sidebar from '../components/Sidebar';

import colors from '../resources/colors.json';

import {withStore} from '../Store';

// TODO: update page URL when completing steps

class Index extends React.Component {
  render() {
    const {currentStep, router} = this.props;

    console.log('ROUTER:', router.query);
    console.log('CURRENT STEP:', currentStep);

    let currentStepContent;
    if (currentStep === 1) {
      currentStepContent = <Step1 />;
    } else if (currentStep === 2) {
      currentStepContent = <Step2 />;
    } else if (currentStep === 3) {
      currentStepContent = <Step3 />;
    } else if (currentStep === 4) {
      currentStepContent = <Step4 />;
    } else if (currentStep === 5) {
      currentStepContent = <Step5 />;
    }

    return (
      <Layout>
        <div className="wrapper">
          <Sidebar />
          <div className="main-content">
            {currentStep === 1 && (
              <React.Fragment>
                <Logo fontSize="60px" />
                <h2>Generate a prime number that looks like your image.</h2>
              </React.Fragment>
            )}

            {/* <Stepper /> */}

            {currentStepContent}
          </div>
        </div>

        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: row;
          }

          .main-content {
            flex: 1;
            min-height: 100vh;
            margin-left: 260px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          h2 {
            text-align: center;
            font-size: 24px;
            font-weight: normal;
            margin: 12px auto 28px auto;
            color: ${colors.blue.medium};
          }
        `}</style>
      </Layout>
    );
  }
}

export default withRouter(withStore(Index));

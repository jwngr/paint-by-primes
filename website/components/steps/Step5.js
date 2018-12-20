import PrimeImage from '../PrimeImage';
import StepInstructions from '../StepInstructions';

import {withStore} from '../../Store';

class Step5 extends React.Component {
  state = {
    primeNumberString: null,
    errorMessage: null,
  };

  componentDidMount() {
    const {imageNumberString} = this.props;
    return fetch('http://localhost:3373/primes', {
      method: 'POST',
      body: JSON.stringify({
        number: imageNumberString,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === 'object' && 'error' in data) {
          this.setState({
            errorMessage: `Failed to fetch prime number: ${data.error.message}`,
          });
        } else {
          console.log('PRIME NUMBER:', data);
          this.setState({
            errorMessage: null,
            primeNumberString: data,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  render() {
    const {pixelatedImage, imageNumberString} = this.props;
    const {errorMessage, primeNumberString} = this.state;

    return (
      <div>
        <StepInstructions>
          <p>Wait for your prime image to be generated.</p>
          <p>Note that this may take several minutes.</p>
        </StepInstructions>

        <p>Number: {imageNumberString}</p>
        <p>Result: {primeNumberString}</p>
        <p>Error: {errorMessage}</p>

        {primeNumberString && (
          <PrimeImage
            pixels={pixelatedImage.pixels}
            hexValues={pixelatedImage.hexValues}
            primeNumberString={primeNumberString}
          />
        )}
      </div>
    );
  }
}

export default withStore(Step5);

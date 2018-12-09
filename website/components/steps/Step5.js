import StepInstructions from '../StepInstructions';

export default class Step5 extends React.Component {
  state = {
    result: null,
    errorMessage: null,
  };

  componentDidMount() {
    const {number} = this.props;
    return fetch('http://localhost:1373/images', {
      method: 'POST',
      body: {number},
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response.json());
        this.setState({
          result: response.json(),
          errorMessage: null,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  render() {
    const {number} = this.props;
    const {result, errorMessage} = this.state;

    return (
      <div>
        <p>Number: {number}</p>
        <p>Result: {result}</p>
        <p>Error: {errorMessage}</p>
      </div>
    );
  }
}

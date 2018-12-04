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
      body: JSON.stringify({number}),
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
    const {result, errorMessage} = this.state;

    if (errorMessage !== null) {
      return <p>Error! {errorMessage}</p>;
    }

    return <p>Result: {result}</p>;
  }
}

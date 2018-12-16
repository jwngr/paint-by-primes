import _ from 'lodash';

import colors from '../../resources/colors.json';

class Logo extends React.Component {
  state = {
    title: 'PRIME IMAGES',
  };

  componentDidMount() {
    this.addLetterFlicker(2, 'I', '1');
    this.addLetterFlicker(4, 'E', '3');
    this.addLetterFlicker(6, 'I', '1');
    this.addLetterFlicker(10, 'E', '3');
    this.addLetterFlicker(11, 'S', '5');
  }

  addLetterFlicker = (index, letter, number) => {
    let delay = _.random(2, 10) * 1000;
    setTimeout(() => {
      const {title} = this.state;

      const letters = title.split('');
      letters[index] = title[index] === letter ? number : letter;

      this.setState({
        title: letters.join(''),
      });

      this.addLetterFlicker(index, letter, number);
    }, delay);
  };

  render() {
    const {title} = this.state;

    return (
      <React.Fragment>
        <h1>{title}</h1>

        <style jsx>{`
          h1 {
            text-align: center;
            font-size: 80px;
            margin: 12px 0;
            font-family: 'Roboto Mono', monospace;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Logo;

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
    let timeout = setTimeout(() => {
      const {title} = this.state;

      const letters = title.split('');
      letters[index] = title[index] === letter ? number : letter;

      this.setState({
        title: letters.join(''),
      });

      clearTimeout(timeout);

      this.addLetterFlicker(index, letter, number);
    }, delay);
  };

  render() {
    const {title} = this.state;
    const {fontSize} = this.props;

    return (
      <React.Fragment>
        <div className="logo-wrapper">
          <div className="logo">{title}</div>
        </div>

        <style jsx>{`
          .logo-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logo {
            text-align: center;
            font-size: ${fontSize};
            font-family: 'Roboto Mono', monospace;
            background-color: ${colors.blue.medium};
            display: inline-block;
            color: ${colors.white};
            padding: 12px 20px;
            font-weight: bold;
            border-radius: 4px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Logo;

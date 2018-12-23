import Fonts from './Fonts';

import colors from '../resources/colors.json';

export default class Layout extends React.Component {
  componentDidMount() {
    Fonts();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <style jsx global>{`
          * {
            font-family: 'Rubik', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            /* Background image from: https://www.toptal.com/designers/subtlepatterns/tex2res5/ */
            background-color: ${colors.moss.lighter};
          }
        `}</style>
      </React.Fragment>
    );
  }
}

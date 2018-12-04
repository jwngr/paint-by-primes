import Header from './Header';
import Fonts from './Fonts';

export default class Layout extends React.Component {
  componentDidMount() {
    Fonts();
  }

  render() {
    return (
      <React.Fragment>
        <div>{this.props.children}</div>
        <style jsx global>{`
          * {
            font-family: 'Rubik', sans-serif;
          }

          body {
            /* Background image from: https://www.toptal.com/designers/subtlepatterns/tex2res5/ */
            background-image: url('/static/images/background.png');
          }
        `}</style>
      </React.Fragment>
    );
  }
}

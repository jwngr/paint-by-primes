import colors from '../resources/colors.json';

export default ({children}) => (
  <React.Fragment>
    <div>{children}</div>
    <style jsx>{`
      div {
        text-align: center;
        font-size: 20px;
        margin-bottom: 28px;
        color: ${colors.blue.medium};
      }
    `}</style>
  </React.Fragment>
);

export default ({children}) => (
  <React.Fragment>
    <div>{children}</div>
    <style jsx>{`
      div {
        text-align: center;
        margin: 28px 0;
        font-size: 20px;
      }
    `}</style>
  </React.Fragment>
);

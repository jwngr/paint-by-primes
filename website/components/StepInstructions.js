export default ({children}) => (
  <React.Fragment>
    <p>{children}</p>
    <style jsx>{`
      p {
        text-align: center;
        font-size: 20px;
      }
    `}</style>
  </React.Fragment>
);

import React from 'react';

import colors from '../../resources/colors.json';

export default ({children, onClick}) => {
  return (
    <React.Fragment>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          cursor: pointer;
          font-size: 20px;
          padding: 8px 20px;
          color: ${colors.darkBlue};
          background-color: ${colors.lightBlue};
          border: solid 2px ${colors.darkBlue};
          border-radius: 4px;
        }
      `}</style>
    </React.Fragment>
  );
};

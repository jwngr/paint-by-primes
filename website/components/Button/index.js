import React from 'react';

import colors from '../../resources/colors.json';

export default ({children, onClick}) => {
  return (
    <React.Fragment>
      <button className="gooey-button" onClick={onClick}>
        {children}
        <div className="goo-blob-container">
          <div className="goo-blob" />
          <div className="goo-blob" />
          <div className="goo-blob" />
          <div className="goo-blob" />
        </div>
      </button>
      <style jsx>{`
        .gooey-button {
          position: relative;
          padding: 12px;
          min-width: 200px;
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          color: #43d8f8;
          background: transparent;
          border: solid 6px #43d8f8;
          transition: background 0.25s, height 1s, width 0.5s;
        }

        .gooey-button:hover {
          color: #000;
        }

        .goo-blob-container {
          position: absolute;
          overflow: hidden;
          top: -3px;
          left: -1px;
          bottom: -3px;
          right: -1px;
          z-index: -1;
        }

        .goo-blob {
          display: block;
          position: absolute;
          width: 30%;
          height: 100%;
          border-radius: 100%;
          background-color: #43d8f8;
          transform: scale(1.3) translateY(125%) translateZ(0);
          transition: all 0.5s;
        }

        .goo-blob:nth-child(1) {
          left: -5%;
          transition-delay: 0ms;
        }

        .goo-blob:nth-child(2) {
          left: 20%;
          transition-delay: 50ms;
        }

        .goo-blob:nth-child(3) {
          left: 45%;
          transition-delay: 25ms;
        }

        .goo-blob:nth-child(4) {
          left: 75%;
          transition-delay: 50ms;
        }

        .gooey-button:hover .goo-blob:nth-child(1) {
          transition-delay: 0ms;
        }

        .gooey-button:hover .goo-blob:nth-child(2) {
          transition-delay: 100ms;
        }

        .gooey-button:hover .goo-blob:nth-child(3) {
          transition-delay: 50ms;
        }

        .gooey-button:hover .goo-blob:nth-child(4) {
          transition-delay: 120ms;
        }

        .gooey-button:hover .goo-blob:nth-child(1) {
          transform: scale(1.4) translateY(0) translateZ(0);
        }

        .gooey-button:hover .goo-blob:nth-child(2) {
          transform: scale(1.4) translateY(0) translateZ(0) rotate(25deg);
        }

        .gooey-button:hover .goo-blob:nth-child(3) {
          transform: scale(1.6) translateY(0) translateZ(0);
        }

        .gooey-button:hover .goo-blob:nth-child(4) {
          transform: scale(1.5) translateY(0) translateZ(0) rotate(-25deg);
        }
      `}</style>
    </React.Fragment>
  );
};

import PropTypes from 'prop-types';
import classNames from 'classnames';

import colors from '../resources/colors.json';

class PrimeImage extends React.Component {
  render() {
    const {pixels, hexValues, primeNumberString} = this.props;

    const numRows = pixels.length;
    const numColumns = pixels[0].length;

    const editorCells = [];
    pixels.map((row, rowId) => {
      row.map(({hexValueIndex}, columnId) => {
        const hexValue = hexValues[hexValueIndex];
        const cellClasses = classNames({
          cell: true,
          [`cell-${hexValue.replace('#', '')}`]: true,
        });

        editorCells.push(
          <div key={`row-${rowId}-col-${columnId}`} className={cellClasses}>
            {primeNumberString[rowId * numColumns + columnId]}
          </div>
        );
      });
    });

    return (
      <React.Fragment>
        <div className="prime-image">{editorCells}</div>

        <style jsx global>{`
          .prime-image {
            display: grid;
            grid-template-rows: repeat(${numRows}, 10px);
            grid-template-columns: repeat(${numColumns}, 10px);
            border: solid 3px ${colors.mediumBlue};
          }

          .cell {
            opacity: 0.5;
            font-size: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          ${hexValues
            .map((hexValue) => {
              return `.cell-${hexValue.replace('#', '')} {
              background-color: ${hexValue};
            }`;
            })
            .join('\n')}
        `}</style>
      </React.Fragment>
    );
  }
}

PrimeImage.propTypes = {
  pixels: PropTypes.array.isRequired,
  hexValues: PropTypes.array.isRequired,
  primeNumberString: PropTypes.string.isRequired,
};

export default PrimeImage;

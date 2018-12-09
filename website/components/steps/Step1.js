import {darken} from 'polished';

import StepInstructions from '../StepInstructions';

import colors from '../../resources/colors.json';

export default class Step1 extends React.Component {
  state = {
    file: null,
  };

  handleChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);

    var img = new Image();

    img.src = file;

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      this.props.goToNextStep({
        file,
        width,
        height,
      });
    };
  };

  render() {
    return (
      <div>
        <StepInstructions>
          <p>Choose a source image.</p>
          <p>Any image works, but pixel art looks best.</p>
        </StepInstructions>

        <div className="file-input-wrapper">
          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            onChange={this.handleChange}
          />
          <label htmlFor="file">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
            Choose a file&hellip;
          </label>
        </div>
        <style jsx>{`
          .file-input-wrapper {
            background: ${colors.red};
            border: solid 2px ${darken(0.2, colors.red)};
            margin: 28px auto 0 auto;
            width: 600px;
            height: 360px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }

          .inputfile + label {
            font-size: 1.25em;
            font-weight: 700;
            display: inline-block;
            cursor: pointer;
            color: ${darken(0.2, colors.red)};
            border: solid 2px ${darken(0.2, colors.red)};

            max-width: 80%;
            font-size: 1.25rem;
            /* 20px */
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            display: inline-block;
            overflow: hidden;
            padding: 0.625rem 1.25rem;
            /* 10px 20px */
          }

          .inputfile + label svg {
            width: 1em;
            height: 1em;
            vertical-align: middle;
            fill: ${darken(0.2, colors.red)};
            margin-top: -0.25em;
            /* 4px */
            margin-right: 0.25em;
            /* 4px */
          }

          .inputfile:focus + label,
          .inputfile.has-focus + label,
          .inputfile + label:hover {
            color: ${darken(0.2, colors.red)};
            background-color: ${darken(0.1, colors.red)};
            outline: 1px dotted #000;
            outline: -webkit-focus-ring-color auto 5px;
          }
        `}</style>
      </div>
    );
  }
}

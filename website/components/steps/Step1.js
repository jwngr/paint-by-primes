import {withRouter} from 'next/router';

import StepInstructions from '../StepInstructions';

import {withStore} from '../../Store';

import colors from '../../resources/colors.json';

class Step1 extends React.Component {
  state = {
    file: null,
  };

  handleChange = (event) => {
    const {router, setSourceImage} = this.props;

    const file = URL.createObjectURL(event.target.files[0]);

    var img = new Image();

    img.src = file;

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      setSourceImage(
        {
          file,
          width,
          height,
        },
        router
      );
    };
  };

  render() {
    return (
      <React.Fragment>
        <div className="image-explanation">
          <img src="/static/mario.png" alt="Mario image" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 512.828 512.828"
          >
            <path
              d="M33.105,473.415L0,428.339l234.096-171.928L0,84.49l33.104-45.077l264.785,194.459
				c7.174,5.269,11.411,13.638,11.411,22.539c0,8.9-4.237,17.27-11.411,22.538L33.105,473.415z"
            />
            <path
              d="M236.635,473.415l-33.105-45.076l234.094-171.928L203.53,84.49l33.104-45.077l264.783,194.459
				c7.174,5.268,11.411,13.637,11.411,22.538c0,8.899-4.237,17.271-11.411,22.538L236.635,473.415z"
            />
          </svg>
          <img src="/static/marioPrime.png" alt="Pixelated Mario prime number image" />
        </div>

        <StepInstructions>
          <p>Choose a source image to get started.</p>
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
            Choose an image&hellip;
          </label>
        </div>

        <p>Or use one of these default images:</p>

        <style jsx>{`
          .image-explanation {
            display: flex;
            border: solide 1px red;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .image-explanation img {
            width: 240px;
            height: 240px;
            margin: 0 40px;
          }

          .file-input-wrapper {
            text-align: center;
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
            font-size: 20px;
            font-weight: 700;
            display: inline-block;
            cursor: pointer;
            color: ${colors.peach.darker};
            border: solid 2px ${colors.peach.darker};
            max-width: 80%;
            font-size: 20px;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            overflow: hidden;
            padding: 10px 20px;
          }

          .inputfile + label svg {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            fill: ${colors.peach.darker};
            margin-top: -4px;
            margin-right: 12px;
          }

          .inputfile:focus + label,
          .inputfile.has-focus + label,
          .inputfile + label:hover {
            color: ${colors.peach.darker};
            background-color: ${colors.peach.lighter};
            outline: 1px dotted #000;
            outline: -webkit-focus-ring-color auto 5px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withRouter(withStore(Step1));

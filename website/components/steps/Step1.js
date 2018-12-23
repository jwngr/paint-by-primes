import {withRouter} from 'next/router';

import Button from '../Button';
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

        <div className="file-buttons">
          <div className="file-input-wrapper">
            <input
              type="file"
              name="file"
              id="file"
              className="file-input"
              onChange={this.handleChange}
              ref={(ref) => {
                this.fileInputRef = ref;
              }}
            />

            <Button onClick={() => this.fileInputRef.click()}>
              <svg width="20" height="20" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
              </svg>
              Upload Your Own Image&hellip;
            </Button>
          </div>

          <p className="or-separator">OR</p>

          <Button>
            <svg height="20" width="20" viewBox="-7 1 463 463.99829">
              <path d="m192.5 240c0 8.835938-7.164062 16-16 16s-16-7.164062-16-16c0-8.839844 7.164062-16 16-16s16 7.160156 16 16zm0 0" />
              <path d="m120.5 311.09375-65.5625 104.90625h93.265625l19.496094-29.347656zm0 0" />
              <path d="m120.5 288c2.757812 0 5.320312 1.417969 6.78125 3.757812l50.136719 80.242188 95.9375-144.433594c1.480469-2.226562 3.976562-3.5625 6.648437-3.566406 2.667969 0 5.164063 1.332031 6.648438 3.550781l113.847656 170.113281v-221.664062h-352v220.101562l65.214844-104.34375c1.460937-2.339843 4.027344-3.757812 6.785156-3.757812zm56-80c17.671875 0 32 14.324219 32 32 0 17.671875-14.328125 32-32 32-17.675781 0-32-14.328125-32-32 0-17.675781 14.324219-32 32-32zm0 0" />
              <path d="m167.417969 416h226.105469l-113.480469-169.578125zm0 0" />
              <path d="m355.8125 128-125.65625-125.65625c-3.125-3.125-8.1875-3.125-11.3125 0l-125.65625 125.65625h-92.6875v336h448v-336zm-131.3125-108.691406 108.6875 108.691406h-217.375zm192 404.691406c0 .132812-.074219.246094-.082031.382812-.035157.777344-.1875 1.546876-.453125 2.28125-.078125.238282-.164063.472657-.265625.703126-.054688.128906-.078125.269531-.144531.398437-.363282.667969-.816407 1.285156-1.351563 1.824219-.089844.089844-.207031.152344-.304687.242187-.582032.53125-1.238282.972657-1.953126 1.308594-.222656.113281-.453124.210937-.6875.296875-.878906.351562-1.8125.542969-2.757812.5625h-368c-.945312-.019531-1.882812-.210938-2.761719-.5625-.226562-.082031-.453125-.175781-.671875-.277344-.753906-.355468-1.453125-.824218-2.0625-1.394531-.058594-.054687-.128906-.085937-.183594-.144531-.519531-.519532-.964843-1.109375-1.320312-1.75-.074219-.160156-.136719-.324219-.191406-.488282-.105469-.222656-.175782-.441406-.265625-.671874-.289063-.789063-.457031-1.617188-.496094-2.457032 0-.09375-.046875-.167968-.046875-.253906v-256c0-4.421875 3.582031-8 8-8h368c4.417969 0 8 3.578125 8 8zm0 0" />
            </svg>
            Use A Random Work Of Art&hellip;
          </Button>
        </div>

        <style jsx>{`
          .image-explanation {
            display: flex;
            border: solide 1px red;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;
          }

          .image-explanation img {
            width: 240px;
            height: 240px;
            margin: 0 40px;
          }

          .file-buttons {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .file-buttons svg {
            margin-right: 12px;
          }

          .file-buttons .or-separator {
            margin: 0 24px;
            font-weight: bold;
            font-size: 24px;
            color: ${colors.blue.medium};
          }

          .file-input {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withRouter(withStore(Step1));

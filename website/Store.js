import React from 'react';

const StoreContext = React.createContext();

const INITIAL_STATE = {
  currentStep: 1,
  latestValidStep: 1,
  sourceImage: null,
  pixelDimensions: null,
  pixelatedImage: null,
};

export default class Store extends React.Component {
  state = INITIAL_STATE;

  setCurrentStep = (step) => {
    const {latestValidStep} = this.state;

    if (step <= latestValidStep) {
      this.setState({
        currentStep: step,
      });
    }
  };

  setSourceImage = (sourceImage) => {
    this.setState({
      sourceImage,
      currentStep: 2,
      latestValidStep: 2,
    });
  };

  setPixelDimensions = (pixelDimensions) => {
    this.setState({
      pixelDimensions,
      currentStep: 3,
      latestValidStep: 3,
    });
  };

  setPixelatedImage = (pixelatedImage) => {
    this.setState({
      pixelatedImage,
      currentStep: 4,
      latestValidStep: 4,
    });
  };

  render() {
    return (
      <StoreContext.Provider
        value={{
          state: this.state,
          actions: {
            setCurrentStep: this.setCurrentStep,
            setSourceImage: this.setSourceImage,
            setPixelatedImage: this.setPixelatedImage,
            setPixelDimensions: this.setPixelDimensions,
          },
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export const withStore = (Component) => {
  return (props) => {
    return (
      <StoreContext.Consumer>
        {({state, actions}) => <Component {...props} {...state} {...actions} />}
      </StoreContext.Consumer>
    );
  };
};

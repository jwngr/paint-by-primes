import * as actions from './actions';

const rootReducer = {
  primeImageId: (state = null, action) => {
    switch (action.type) {
      case actions.ROUTER_LOCATION_CHANGED:
        const {params} = action.payload;

        const primeImageId = params.primeImageId;

        if (typeof primeImageId === 'string' && primeImageId !== '') {
          return primeImageId;
        }

        return state;
      default:
        return state;
    }
  },

  currentStep: (state = 1, action) => {
    switch (action.type) {
      case actions.SET_CURRENT_STEP:
        return action.step;
      case actions.SET_SOURCE_IMAGE:
        return 2;
      case actions.SET_PIXEL_DIMENSIONS:
        return 3;
      case actions.SET_PIXELATED_IMAGE:
        return 4;
      case actions.SET_DIGIT_MAPPINGS:
      case actions.SET_PRIME_IMAGE:
        return 5;
      default:
        return state;
    }
  },

  latestCompletedStep: (state = 1, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
        return 1;
      case actions.SET_PIXEL_DIMENSIONS:
        return 2;
      case actions.SET_PIXELATED_IMAGE:
        return 3;
      case actions.SET_DIGIT_MAPPINGS:
        return 4;
      case actions.SET_PRIME_IMAGE:
        return 5;
      default:
        return state;
    }
  },

  sourceImage: (state = null, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
        return action.sourceImage;
      default:
        return state;
    }
  },

  pixelDimensions: (state = null, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
        return null;
      case actions.SET_PIXEL_DIMENSIONS:
        return action.pixelDimensions;
      default:
        return state;
    }
  },

  pixelatedImage: (state = null, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
      case actions.SET_PIXEL_DIMENSIONS:
        return null;
      case actions.SET_PIXELATED_IMAGE:
        return action.pixelatedImage;
      default:
        return state;
    }
  },

  digitMappings: (state = null, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
      case actions.SET_PIXEL_DIMENSIONS:
      case actions.SET_PIXELATED_IMAGE:
        return null;
      case actions.SET_DIGIT_MAPPINGS:
        return action.digitMappings;
      default:
        return state;
    }
  },

  primeImage: (state = null, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
      case actions.SET_PIXEL_DIMENSIONS:
      case actions.SET_PIXELATED_IMAGE:
      case actions.SET_DIGIT_MAPPINGS:
        return null;
      case actions.SET_PRIME_IMAGE:
        return action.primeImage;
      default:
        return state;
    }
  },
};

export default rootReducer;

import _ from 'lodash';

import * as actions from './actions';

const INITIAL_STATE = {
  currentStep: 1,
  primeImage: null,
  sourceImage: null,
  primeImageId: null,
  digitMappings: null,
  pixelatedImage: null,
  pixelDimensions: null,
  latestCompletedStep: 0,
};

// const INITIAL_STATE = {
//   currentStep: 3,
//   sourceImage: {
//     width: 600,
//     height: 702,
//     fileUrl: 'http://localhost:3000/images/pearlEarring.jpg',
//     // fileBlob: Blob(121221),
//   },
//   primeImage: null,
//   primeImageId: null,
//   digitMappings: null,
//   pixelatedImage: null,
//   latestCompletedStep: 2,
//   pixelDimensions: {width: 18, height: 18},
// };

const _getPrimeImageIdFromRouter = (params, state) => {
  const {primeImageId} = params;

  if (typeof primeImageId === 'string' && primeImageId !== '') {
    return primeImageId;
  }

  return state;
};

const rootReducer = {
  primeImageId: (state = INITIAL_STATE.primeImageId, action) => {
    switch (action.type) {
      case actions.ROUTER_LOCATION_CHANGED:
        return _getPrimeImageIdFromRouter(_.get(action, 'payload.params', {}), state);
      default:
        return state;
    }
  },

  currentStep: (state = INITIAL_STATE.currentStep, action) => {
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
      case actions.SET_STATE_FROM_FIRESTORE:
        return action.currentStep;
      case actions.ROUTER_LOCATION_CHANGED:
        const primeImageId = _getPrimeImageIdFromRouter(_.get(action, 'payload.params', {}));
        if (typeof primeImageId === 'undefined') {
          return state;
        } else {
          return 5;
        }
      default:
        return state;
    }
  },

  latestCompletedStep: (state = INITIAL_STATE.latestCompletedStep, action) => {
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
      case actions.SET_STATE_FROM_FIRESTORE:
        return action.latestCompletedStep;
      case actions.ROUTER_LOCATION_CHANGED:
        const primeImageId = _getPrimeImageIdFromRouter(_.get(action, 'payload.params', {}));
        if (typeof primeImageId === 'undefined') {
          return state;
        } else {
          return 4;
        }
      default:
        return state;
    }
  },

  sourceImage: (state = INITIAL_STATE.sourceImage, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
        return action.sourceImage;
      case actions.SET_STATE_FROM_FIRESTORE:
        return action.sourceImage;
      default:
        return state;
    }
  },

  pixelDimensions: (state = INITIAL_STATE.pixelDimensions, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
        return null;
      case actions.SET_PIXEL_DIMENSIONS:
        return action.pixelDimensions;
      case actions.SET_STATE_FROM_FIRESTORE:
        return action.pixelDimensions;
      default:
        return state;
    }
  },

  pixelatedImage: (state = INITIAL_STATE.pixelatedImage, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
      case actions.SET_PIXEL_DIMENSIONS:
        return null;
      case actions.SET_PIXELATED_IMAGE:
        return action.pixelatedImage;
      case actions.SET_STATE_FROM_FIRESTORE:
        return action.pixelatedImage;
      default:
        return state;
    }
  },

  digitMappings: (state = INITIAL_STATE.digitMappings, action) => {
    switch (action.type) {
      case actions.SET_SOURCE_IMAGE:
      case actions.SET_PIXEL_DIMENSIONS:
      case actions.SET_PIXELATED_IMAGE:
        return null;
      case actions.SET_DIGIT_MAPPINGS:
        return action.digitMappings;
      case actions.SET_STATE_FROM_FIRESTORE:
        return action.digitMappings;
      default:
        return state;
    }
  },

  primeImage: (state = INITIAL_STATE.primeImage, action) => {
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

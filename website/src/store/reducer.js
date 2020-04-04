import _ from 'lodash';
import {LOCATION_CHANGE} from 'connected-react-router';

import * as actions from './actions';

const INITIAL_STATE = {
  postId: null,
  currentStep: 1,
  primeImage: null,
  sourceImage: null,
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
//   postId: null,
//   digitMappings: null,
//   pixelatedImage: null,
//   latestCompletedStep: 2,
//   pixelDimensions: {width: 18, height: 18},
// };

const _getPostIdFromRouter = (params) => {
  const {postId} = params;

  if (typeof postId === 'string' && postId !== '') {
    return postId;
  }
};

export function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const postId = _getPostIdFromRouter(_.get(action, 'payload.params', {}));

      return {
        ...state,
        postId: postId || state.postId,
        currentStep: typeof postId === 'undefined' ? state.currentStep : 5,
        latestCompletedStep:
          typeof postId === 'undefined' ||
          state.latestCompletedStep !== INITIAL_STATE.latestCompletedStep
            ? state.latestCompletedStep
            : 4,
      };
    }
    case actions.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.step,
      };
    case actions.SET_SOURCE_IMAGE:
      return {
        ...state,
        currentStep: 2,
        latestCompletedStep: 1,
        sourceImage: action.sourceImage,
        pixelDimensions: null,
        pixelatedImage: null,
        digitMappings: null,
        primeImage: null,
      };
    case actions.SET_PIXEL_DIMENSIONS:
      return {
        ...state,
        currentStep: 3,
        latestCompletedStep: 2,
        pixelDimensions: action.pixelDimensions,
        pixelatedImage: null,
        digitMappings: null,
        primeImage: null,
      };
    case actions.SET_PIXELATED_IMAGE:
      return {
        ...state,
        currentStep: 4,
        latestCompletedStep: 3,
        pixelatedImage: action.pixelatedImage,
        digitMappings: null,
        primeImage: null,
      };
    case actions.SET_DIGIT_MAPPINGS:
      return {
        ...state,
        currentStep: 5,
        latestCompletedStep: 4,
        digitMappings: action.digitMappings,
        primeImage: null,
      };
    case actions.SET_PRIME_IMAGE:
      return {
        ...state,
        currentStep: 5,
        latestCompletedStep: 5,
        primeImage: action.primeImage || state.primeImage,
      };
    case actions.SET_STATE_FROM_FIRESTORE:
      return {
        ...state,
        currentStep: action.currentStep,
        latestCompletedStep: action.latestCompletedStep,
        sourceImage: action.sourceImage,
        pixelDimensions: action.pixelDimensions,
        pixelatedImage: action.pixelatedImage,
        digitMappings: action.digitMappings,
        primeImage: action.primeImage || state.primeImage,
      };
    default:
      return state;
  }
}

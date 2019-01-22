import {push} from 'redux-little-router';

// Router location changed action from redux-little-router.
export const ROUTER_LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';

export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';
export const SET_SOURCE_IMAGE = 'SET_SOURCE_IMAGE';
export const SET_PIXEL_DIMENSIONS = 'SET_PIXEL_DIMENSIONS';
export const SET_PIXELATED_IMAGE = 'SET_PIXELATED_IMAGE';
export const SET_DIGIT_MAPPINGS = 'SET_DIGIT_MAPPINGS';
export const SET_PRIME_IMAGE = 'SET_PRIME_IMAGE';
export const SET_STATE_FROM_FIRESTORE = 'SET_STATE_FROM_FIRESTORE';

const _setCurrentStepHelper = (step) => {
  return {
    type: SET_CURRENT_STEP,
    step,
  };
};

export function setCurrentStep(step) {
  return (dispatch, getState) => {
    const {router, primeImageId, latestCompletedStep} = getState();

    if (step <= latestCompletedStep + 1) {
      dispatch(_setCurrentStepHelper(step));

      if (step === 5 && typeof primeImageId === 'string' && router.pathname === '/') {
        dispatch(push(`/p/${primeImageId}`));
      } else if (step < 5 && router.pathname !== '/') {
        dispatch(push('/'));
      }
    }
  };
}

export function setSourceImage(sourceImage) {
  return {
    type: SET_SOURCE_IMAGE,
    sourceImage,
  };
}

export function setPixelDimensions(pixelDimensions) {
  return {
    type: SET_PIXEL_DIMENSIONS,
    pixelDimensions,
  };
}

export function setPixelatedImage(pixelatedImage) {
  return {
    type: SET_PIXELATED_IMAGE,
    pixelatedImage,
  };
}

export function setDigitMappings(digitMappings) {
  return {
    type: SET_DIGIT_MAPPINGS,
    digitMappings,
  };
}

export function setPrimeImage(primeImage) {
  return {
    type: SET_PRIME_IMAGE,
    primeImage,
  };
}

export function setStateFromFirestore(payload) {
  return {
    type: SET_STATE_FROM_FIRESTORE,
    ...payload,
  };
}

import * as c from './starHopConstants';
import { DEFAULT_SERVICE_STATUS, getUrlParam } from 'utils';

const ORION_VIEW = {
  ra: 5,
  dec: 0,
  fov: 7,
  magLimit: 5,
  width: 600,
  height: 600,
};

// TODO FIX THIS
const ORION_EYEPIECE_VIEW = {
  raFrom: 5.8,
  raTo: 6,
  decFrom: 6.5,
  decTo: 8.3,
  magLimit: 11,
  width: 300,
  height: 300,
  scopeType: 'Correct Image',
};

const PLEIADES_VIEW = {
  ra: 3.78,
  dec: 24,
  fov: 7,
  magLimit: 9,
  width: 600,
  height: 600,
};

const PLEIADES_EYEPIECE_VIEW = {
  ra: 3.78,
  dec: 24,
  fov: 1.4,
  magLimit: 15,
  width: 300,
  height: 300,
  scopeType: 'Correct Image',
};

export const defaultState = {
  stars: [],
  view: PLEIADES_VIEW,
  eyepieceView: PLEIADES_EYEPIECE_VIEW,
  starStatus: DEFAULT_SERVICE_STATUS,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case c.GET_STARS_SUCCESS:
    case c.GET_STARS_FAILURE:
      return {
        ...state,
        stars: action.stars,
        starStatus: action.starStatus,
      };

    case c.UPDATE_VIEW:
      return {
        ...state,
        view: action.view,
      };

    case c.UPDATE_EYEPIECE_VIEW:
      return {
        ...state,
        eyepieceView: action.view,
      };

    default:
      return state;
  }
}

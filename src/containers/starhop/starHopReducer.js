import * as c from './starHopConstants';
import { DEFAULT_SERVICE_STATUS, getUrlParam } from 'utils';

const ORION_VIEW = {
  raFrom: 4.5,
  raTo: 6.5,
  decFrom: -15,
  decTo: 15,
  magLimit: 5,
  width: 600,
  height: 600,
};

const ORION_EYEPIECE_VIEW = {
  raFrom: 4.5,
  raTo: 6.5,
  decFrom: -15,
  decTo: 15,
  magLimit: 11,
  width: 300,
  height: 300,
};

const PLEIADES_VIEW = {
  raFrom: 3.3,
  raTo: 4.5,
  decFrom: 20,
  decTo: 27,
  magLimit: 9,
  width: 600,
  height: 600,
};

const PLEIADES_EYEPIECE_VIEW = {
  raFrom: 3.73,
  raTo: 3.85,
  decFrom: 23.3,
  decTo: 24.8,
  magLimit: 15,
  width: 300,
  height: 300,
  scopeType: 'Refractor',
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

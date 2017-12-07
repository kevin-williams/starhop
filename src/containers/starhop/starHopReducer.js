import * as c from './starHopConstants';
import { DEFAULT_SERVICE_STATUS, getUrlParam } from 'utils';

const DEFAULT_FINDER_VIEW = {
  fov: 7,
  magLimit: 8,
  width: 600,
  height: 600,
};

const DEFAULT_EYEPIECE_VIEW = {
  fov: 1.4,
  magLimit: 12,
  width: 300,
  height: 300,
  scopeType: 'Dobsonian',
};

export const defaultState = {
  stars: [],
  dsos: [],
  view: DEFAULT_FINDER_VIEW,
  eyepieceView: DEFAULT_EYEPIECE_VIEW,
  location: {
    ra: 5,
    dec: 15,
  },
  starStatus: DEFAULT_SERVICE_STATUS,
  selectedHop: {
    id: '',
    description: 'Please select an object to practicing hopping to',
  },
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

    case c.GET_DEEP_SPACE_SUCCESS:
    case c.GET_DEEP_SPACE_FAILURE:
      return {
        ...state,
        dsos: action.dsos,
      };

    case c.UPDATE_LOCATION:
      return {
        ...state,
        location: action.location,
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

    case c.UPDATE_SELECTED_HOP:
      return {
        ...state,
        selectedHop: action.hop,
        location: action.hop.startingLocation,
      };

    default:
      return state;
  }
}

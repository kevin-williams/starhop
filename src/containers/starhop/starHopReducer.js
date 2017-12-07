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

const RA_OFFSET = 0.03;
const DEC_OFFSET = 0.2;

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
  targetFound: false,
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
      let targetFound = viewContainsTarget(state.eyepieceView, state.selectedHop.targetLocation);
      return {
        ...state,
        location: action.location,
        targetFound,
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
        targetFound: false,
      };

    default:
      return state;
  }
}

function viewContainsTarget(view, target) {
  console.log(`containsTarget 
    view=${JSON.stringify(view)}
    target=${JSON.stringify(target)}
  `);
  let found =
    target.ra > view.raFrom + RA_OFFSET &&
    target.ra < view.raTo - RA_OFFSET &&
    target.dec > view.decFrom + DEC_OFFSET &&
    target.dec < view.decTo - DEC_OFFSET;
  console.log('\t\tfound=', found);
  return found;
}

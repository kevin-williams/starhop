import * as c from './starHopConstants';
import { DEFAULT_SERVICE_STATUS, getUrlParam } from 'utils';

const ORION_VIEW = {
  raFrom: 4.5,
    raTo: 6.5,
    decFrom: -15,
    decTo: 15,
    magLimit: 5,
    width: 600,
    height: 600
}

const PLEIADES_VIEW = {
  raFrom: 3.6,
  raTo: 4,
  decFrom: 22,
  decTo: 25,
  magLimit: 9,
  width: 600,
  height: 600
}



export const defaultState = {
  stars: [],
  view: ORION_VIEW,
  starStatus: DEFAULT_SERVICE_STATUS
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

    default:
      return state;
  }
}

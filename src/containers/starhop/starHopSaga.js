import axios from 'axios';

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { loadStars } from './starMapData';

import * as c from './starHopConstants';

/* This function is called whenever an action is published to redux to check for a "GET_ZIP" action.
    If found, call getZipCode
   This is registered in the root saga.
 */
export function* watchGetStars() {
  yield call(takeEvery, c.GET_STARS, getStars);
}

// Method to call out to the zip code service (this one is on our server, but could be external too)
const getStarsLookup = starQuery => {
  console.log('Searching db for stars matching', starQuery);
  return loadStars(starQuery);
};

/* Take the zip code from the action, and if less than 5, just update the redux state with the entered zip code fragment.
   Once we get to 5 characters, actually call the service to look up the zip code and then set the redux state with the results
 */
export function* getStars(action) {
  console.log('calling getStars with action=', action);
  try {

    const stars = yield call(getStarsLookup, action.starQuery);
    console.log('data for stars=', stars);

    if (stars && stars.length > 0) {
      yield put({
        type: c.GET_STARS_SUCCESS,
        stars: stars,
        starStatus: {
          serviceFailure: false,
          message: `${stars.length} stars found`
        }
      });

    } else {
      yield put({ type: c.GET_STARS_FAILURE, stars: [],
        starStatus: {
        serviceFailure: false,
        message: 'No stars found'
      }
      });
    }
  } catch (error) {
    yield put({
      type: c.GET_STARS_FAILURE,
      stars: [],
      status: parseServiceErrorStatus('Error loading stars', error),
    });
  }
}

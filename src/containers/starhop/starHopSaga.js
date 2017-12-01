import axios from 'axios';

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { DEFAULT_SERVICE_STATUS } from '../../utils';

import * as c from './starHopConstants';

/* This function is called whenever an action is published to redux to check for a "GET_ZIP" action.
    If found, call getZipCode
   This is registered in the root saga.
 */
export function* watchUpdateZip() {
  yield call(takeEvery, c.GET_ZIP, getZipCode);
}

// Method to call out to the zip code service (this one is on our server, but could be external too)
const callZipCodeService = zipCode => {
  try {
    return axios.get('/api/location/' + zipCode);
  } catch (error) {
    console.log('got error', error);
  }
};

/* Take the zip code from the action, and if less than 5, just update the redux state with the entered zip code fragment.
   Once we get to 5 characters, actually call the service to look up the zip code and then set the redux state with the results
 */
export function* getZipCode(action) {
  console.log('calling getZipCode with action=', action);
  try {
    if (action.zipCode.length < 5) {
      yield put({
        type: c.GET_ZIP_SUCCESS,
        zipCode: action.zipCode,
        city: '',
        state: '',
        latitude: 0,
        longitude: 0,
        status: DEFAULT_SERVICE_STATUS,
      });

      return;
    }

    const resp = yield call(callZipCodeService, action.zipCode);
    console.log('resp data for zip code=', resp.data);
    if (resp.data && !resp.data.status.serviceFailure) {
      yield put({
        type: c.GET_ZIP_SUCCESS,
        zipCode: action.zipCode,
        city: resp.data.zipCode['place name'],
        state: resp.data.zipCode.state,
        latitude: resp.data.zipCode.latitude,
        longitude: resp.data.zipCode.longitude,
        status: resp.data.status,
      });
    } else {
      yield put({ type: c.GET_ZIP_FAILURE, zipCode: '', status: resp.data.status });
    }
  } catch (error) {
    yield put({
      type: c.GET_ZIP_FAILURE,
      zipCode: '',
      status: parseServiceErrorStatus('Error looking up zip code', error),
    });
  }
}

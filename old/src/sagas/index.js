import * as starhop from '../containers/starhop/starHopSaga';

/*
 This starts all the watchers for the app.
 So every import above should have 1 or more watch functions that is registered below.

 If you don't put the function in here, the redux action will not work!
 */
export default function* rootSaga() {
  yield [starhop.watchGetStars(), starhop.watchGetDeepSpaceObjects()];
}

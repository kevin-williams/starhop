import * as c from './starHopConstants';

// updateZip action will post the GET_ZIP action to redux
export const getStars = starQuery => ({
  type: c.GET_STARS,
  starQuery,
});

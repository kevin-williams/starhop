import * as c from './starHopConstants';

// updateZip action will post the GET_ZIP action to redux
export const getStars = starQuery => ({
  type: c.GET_STARS,
  starQuery,
});

export const updateView = view => ({
  type: c.UPDATE_VIEW,
  view,
});

export const updateEyepieceView = view => ({
  type: c.UPDATE_EYEPIECE_VIEW,
  view,
});

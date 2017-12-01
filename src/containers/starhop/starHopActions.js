import * as c from './starHopConstants';

// updateZip action will post the GET_ZIP action to redux
export const updateZip = zipCode => ({
  type: c.GET_ZIP,
  zipCode,
});

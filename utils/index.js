export const ARCMINUTE_TO_DEG = 0.0167;
export const DSO_SCALE_CONSTANT = 0.7; // You won't see the full extent of the object in most scopes, so make it a bit smaller
export const RA_TO_DEG = 360 / 24;

export const getXYCoordinates = (ra, dec) => {
  const x = Number(ra) * RA_TO_DEG * 3;
  const y = (-Number(dec) + 90) * 2 * 3;

  return { x, y };
};

import { getXYCoordinates } from '../../utils';

const Star = ({ star, mapRange }) => {
  const { x, y } = getXYCoordinates(star.ra, star.dec);

  let r = 7.0 - Number(star.mag);
  if (r < 1) {
    r = 1;
  }

  console.log('star-render', star, x, y, r);

  return <circle cx={x} cy={y} r={r} fill="url(#StarGradient)" />;
};

export default Star;

import { getXYCoordinates } from '../../utils';

const Star = ({ star, clipPath }) => {
  const mag = Number(star.mag);

  const { x, y } = getXYCoordinates(star.ra, star.dec);

  const animDuration = Math.random() * 3 + 's';

  let r = 7.0 - mag;
  if (r < 1) {
    r = 1;
  }

  //   console.log('star-render', star, x, y, r);

  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill="url(#StarGradient)"
      opacity={0.8}
      clipPath={`url(#${clipPath})`}
    >
      {/* <animate
        attributeName="opacity"
        values="0.6;1;0.6"
        dur={animDuration}
        repeatCount="indefinite"
      /> */}
    </circle>
  );
};

export default Star;

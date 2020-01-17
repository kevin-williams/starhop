const Star = ({ star }) => {
  const cx = star.ra * 100;
  const cy = star.dec * 5;
  let r = 15 - star.magnitude;
  if (r < 1) {
    r = 1;
  }

  console.log('star', star);
  console.log('params', cx, cy, r);

  return <circle cx={cx} cy={cy} r={r} fill="url(#StarGradient)" />;
};

export default Star;

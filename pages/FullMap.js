import StarMap from '../components/starmap/StarMap';

const FullMap = () => (
  <StarMap mapParams={{ limitingMag: 6, ra: 0, dec: 90 }} size={1080} />
);

export default FullMap;

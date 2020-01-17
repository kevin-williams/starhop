import StarMap from '../components/starmap/StarMap';

const FullMap = () => (
  <StarMap
    mapRange={{ raFrom: 0, raTo: 24, decFrom: -90, decTo: 90 }}
    mapParams={{ limitingMag: 6, ra: 0, dec: 90, clipCircle: false }}
    size={1080}
  />
);

export default FullMap;

import StarMap from '../components/starmap/StarMap';

const FullMap = () => (
  <StarMap
    mapRange={{ raFrom: 0, raTo: 24, decFrom: -90, decTo: 90 }}
    mapParams={{ limitingMag: 6 }}
    size={{ width: 1080, height: 1080 }}
  />
);

export default FullMap;

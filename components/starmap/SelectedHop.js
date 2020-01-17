import Link from 'next/link';
import styled from 'styled-components';

import StarMap from './StarMap';

const MainDiv = styled.div`
  display: flex;
  border-style: solid;
  border-color: blue;
  border-width: 2px;
  width: 100%;
  margin: 10px;
  justify-items: center;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const SelectedHop = ({ selectedHop }) => {
  if (
    !selectedHop ||
    !selectedHop.targetLocation ||
    !selectedHop.targetLocation.ra > 0
  ) {
    return null;
  }
  return (
    <MainDiv>
      <InfoDiv>
        <div>{selectedHop.id}</div>
        <div>{selectedHop.difficulty}</div>
        <div>{selectedHop.description}</div>
        <div>{selectedHop.hint}</div>
        <Link href="/StarHop">
          <button>Start Hop</button>
        </Link>
      </InfoDiv>
      <StarMap
        mapRange={selectedHop.starMapQuery}
        mapParams={{ limitingMag: 6 }}
      />
    </MainDiv>
  );
};

export default SelectedHop;

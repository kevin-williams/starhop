import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  border-style: solid;
  border-color: blue;
  border-width: 2px;
  width: 100%;
  margin: 10px;
  justify-items: center;
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
      <div>
        <div>{selectedHop.id}</div>
        <div>{selectedHop.difficulty}</div>
        <div>{selectedHop.description}</div>
        <div>{selectedHop.hint}</div>
      </div>
      <div style={{ width: 300, height: 300 }}>Starmap here</div>
    </MainDiv>
  );
};

export default SelectedHop;

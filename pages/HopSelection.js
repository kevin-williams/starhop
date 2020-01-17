import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { MdBlurCircular } from 'react-icons/md';

import Header from '../styles/Header';
import NavBar from '../components/NavBar';
import SelectedHop from '../components/starmap/SelectedHop';

const SELECTION_QUERY = gql`
  query {
    hops @client
    selectedHop @client {
      id
      hint
      description
      difficulty
      starMapQuery {
        raFrom
        raTo
        decFrom
        decTo
      }
      startingLocation {
        name
        ra
        dec
      }
      targetLocation {
        ra
        dec
      }
    }
  }
`;

const hopToGQL = hop => {
  const myHop = {
    ...hop,
    __typename: 'selectedHop'
  };

  myHop.starMapQuery.__typename = 'starMapQuery';
  myHop.startingLocation = myHop.startingLocation.map(loc => {
    return { ...loc, __typename: 'startingLocation' };
  });
  myHop.targetLocation.__typename = 'targetLocation';

  console.log('myHop', myHop);
  return myHop;
};

const HopDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 5fr 2fr;
  margin: 10px;
  justify-items: center;
  align-items: center;
`;

const Difficulty = styled(MdBlurCircular)`
  color: ${props =>
    props.difficulty === 'easy'
      ? 'green'
      : props.difficulty === 'medium'
      ? 'yellow'
      : 'red'};
`;

const HopSelection = () => {
  const { client, data, loading, refetch } = useQuery(SELECTION_QUERY);

  console.log('data', data);

  return (
    <div>
      <Header />
      <NavBar />

      {!loading && data.selectedHop && (
        <SelectedHop selectedHop={data.selectedHop} />
      )}

      {!loading &&
        data.hops.map(hop => (
          <HopDiv key={hop.id}>
            <span>{hop.id}</span>
            <Difficulty size={20} difficulty={hop.difficulty} />
            <span>{hop.description}</span>
            <span>
              <button
                onClick={() => {
                  client.writeData({
                    data: { selectedHop: hopToGQL(hop) }
                  });
                  refetch();
                }}
              >
                Select
              </button>
            </span>
          </HopDiv>
        ))}
    </div>
  );
};

export default HopSelection;

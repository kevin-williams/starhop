import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Header from '../styles/Header';
import NavBar from '../components/NavBar';

const DATA_QUERY = gql`
  query dsos($rangeInput: Object!) {
    dsos(input: $rangeInput) @client
    stars(input: $rangeInput) @client
  }
`;

const SELECTION_QUERY = gql`
  query {
    hops @client
  }
`;

const HopDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 5fr 2fr;
  margin: 50px;
`;

const Difficulty = styled.span`
  color: ${props => (props.difficulty === 'easy' ? 'green' : 'red')};
`;

const HopSelection = () => {
  const { client, data, loading } = useQuery(SELECTION_QUERY, {
    variables: { rangeInput: { raFrom: 1, raTo: 5, decFrom: 0, decTo: 50 } }
  });

  console.log('data', data);

  return (
    <div>
      <Header />
      <NavBar />
      {!loading &&
        data.hops.map(hop => (
          <HopDiv key={hop.id}>
            <span>{hop.id}</span>
            <Difficulty difficulty={hop.difficulty}>
              {hop.difficulty}
            </Difficulty>
            <span>{hop.description}</span>
            <span>
              <button>Select</button>
            </span>
          </HopDiv>
        ))}
    </div>
  );
};

export default HopSelection;

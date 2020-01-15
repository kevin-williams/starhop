import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Header from '../styles/Header';
import NavBar from '../components/NavBar';

const SELECTION_QUERY = gql`
  query dsos(
    $raFrom: Number!
    $raTo: Number!
    $decFrom: Number!
    $decTo: Number!
  ) {
    dsos(raFrom: $raFrom, raTo: $raTo, decFrom: $decFrom, decTo: $decTo) @client
  }
`;

// const SELECTION_QUERY = gql`
//   query {
//     location @client {
//       ra
//       dec
//     }
//   }
// `;

const HopSelection = () => {
  const { client, data } = useQuery(SELECTION_QUERY, {
    variables: { raFrom: 1, raTo: 2, decFrom: 0, decTo: 10 }
  });

  console.log('data', data);

  return (
    <div>
      <Header />
      <NavBar />
    </div>
  );
};

export default HopSelection;

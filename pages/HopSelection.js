import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Header from '../styles/Header';
import NavBar from '../components/NavBar';

// const SELECTION_QUERY = gql`
//   query {
//     dsos @client(raFrom: 1, raTo: 2, decFrom: 1, decTo: 2)
//   }
// `;

const SELECTION_QUERY = gql`
  query {
    location @client {
      ra
      dec
    }
  }
`;

const HopSelection = () => {
  const { client, data } = useQuery(SELECTION_QUERY);

  console.log('data', data);

  return (
    <div>
      <Header />
      <NavBar />
    </div>
  );
};

export default HopSelection;

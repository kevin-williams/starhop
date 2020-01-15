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

const HopSelection = () => {
  const { client, data } = useQuery(SELECTION_QUERY, {
    variables: { rangeInput: { raFrom: 1, raTo: 5, decFrom: 0, decTo: 50 } }
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

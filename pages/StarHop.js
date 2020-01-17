import React, { useState } from 'react';
import Link from 'next/link';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import AdSense from 'react-adsense';
import {
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward
} from 'react-icons/md';
import styled from 'styled-components';

import Header from '../styles/Header';
import StarMap from '../components/starmap/StarMap';
import { RA_TO_DEG } from '../utils';

const SELECTION_QUERY = gql`
  query {
    selectedHop @client {
      id
      hint
      description
      difficulty
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

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StarHop = () => {
  const { client, data, loading, refetch } = useQuery(SELECTION_QUERY);
  const [location, setLocation] = useState({ ra: -99, dec: 0 });
  const [speed, setSpeed] = useState(1);

  if (loading) {
    // TODO add circle loader
    return null;
  }

  // set to starting location
  if (location.ra === -99) {
    // TODO select starting location earlier and use here.   For now use 1st starting loc
    const location = data.selectedHop.startingLocation[0];
    setLocation(location);
  }

  return (
    <div>
      <Header />
      <AdSense.Google
        client="ca-pub-6513320241703770"
        slot="9365940470"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
      />
      <div>
        <Link href="/HopSelection">
          <button>
            <MdArrowBack size={20} />
          </button>
        </Link>
      </div>
      <MapContainer>
        <StarMap size={500} mapParams={{ limitingMag: 7, ...location }} />
        <div>
          <button
            onClick={() =>
              setLocation({ ra: location.ra, dec: location.dec - speed })
            }
          >
            <MdArrowUpward size={30} />
          </button>
          <button
            onClick={() =>
              setLocation({ ra: location.ra, dec: location.dec + speed })
            }
          >
            <MdArrowDownward size={30} />
          </button>
          <button
            onClick={() =>
              setLocation({
                ra: location.ra - speed / RA_TO_DEG,
                dec: location.dec
              })
            }
          >
            <MdArrowForward size={30} />
          </button>
          <button
            onClick={() =>
              setLocation({
                ra: location.ra + speed / RA_TO_DEG,
                dec: location.dec
              })
            }
          >
            <MdArrowBack size={30} />
          </button>
        </div>
      </MapContainer>
    </div>
  );
};

export default StarHop;

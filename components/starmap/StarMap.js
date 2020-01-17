import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import Star from './Star';

const StarMapCanvas = styled.svg`
  background-color: black;
`;

const DATA_QUERY = gql`
  query dsos($rangeInput: Object!) {
    dsos(input: $rangeInput) @client
    stars(input: $rangeInput) @client
  }
`;

const StarMap = ({ size = {}, mapRange, mapParams }) => {
  const { width = 500, height = 500 } = size;
  const { raFrom, raTo, decFrom, decTo } = mapRange;

  const { client, data, loading, refetch } = useQuery(DATA_QUERY, {
    variables: { rangeInput: { raFrom, raTo, decFrom, decTo } }
  });

  !loading && console.log('stars=', data.stars);

  return (
    <StarMapCanvas fill="lightGrey" width={width} height={height}>
      <defs>
        <radialGradient id="StarGradient">
          <stop offset="0%" stopColor="lightGrey" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
      </defs>

      {!loading &&
        data.stars.map((star, index) => {
          if (Number(star.mag) > mapParams.limitingMag) return null;
          return <Star key={`star-${index}`} star={star} mapRange={mapRange} />;
        })}
    </StarMapCanvas>
  );
};

export default StarMap;

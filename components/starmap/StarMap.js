import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import Star from './Star';
import { getXYCoordinates } from '../../utils';

const StarMapDiv = styled.svg`
  background-color: black;
`;

const StarMapCanvas = styled.svg`
  background-color: black;
`;

const DATA_QUERY = gql`
  query dsos($rangeInput: Object!) {
    dsos(input: $rangeInput) @client
    stars(input: $rangeInput) @client
  }
`;

const StarMap = ({ size, mapRange, mapParams }) => {
  const { raFrom, raTo, decFrom, decTo } = mapRange;

  const { client, data, loading, refetch } = useQuery(DATA_QUERY, {
    variables: { rangeInput: { raFrom, raTo, decFrom, decTo } }
  });

  !loading && console.log('stars=', data.stars);

  const { x, y } = getXYCoordinates(mapParams.ra, mapParams.dec);

  return (
    <StarMapDiv width={size} height={size}>
      <g transform={`translate(-${x}, -${y})`}>
        <StarMapCanvas fill="lightGrey" width={1080} height={1080}>
          <defs>
            <radialGradient id="StarGradient">
              <stop offset="0%" stopColor="lightGrey" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            {mapParams.clipCircle && (
              <clipPath id="viewport">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={size / 2}
                  transform={`translate(${x}, ${y})`}
                />
              </clipPath>
            )}
          </defs>

          {!loading &&
            data.stars.map((star, index) => {
              if (Number(star.mag) > mapParams.limitingMag) return null;
              return (
                <Star
                  key={`star-${index}`}
                  star={star}
                  mapRange={mapRange}
                  clipPath="viewport"
                />
              );
            })}
        </StarMapCanvas>
      </g>
    </StarMapDiv>
  );
};

export default StarMap;

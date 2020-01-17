import styled from 'styled-components';

import Star from './Star';

const StarMapCanvas = styled.svg`
  background-color: black;
`;

const StarMap = ({ width = 500, height = 500 }) => {
  return (
    <StarMapCanvas fill="lightGrey">
      <defs>
        <radialGradient id="StarGradient">
          <stop offset="0%" stop-color="lightGrey" />
          <stop offset="100%" stop-color="black" />
        </radialGradient>
      </defs>

      <Star star={{ ra: 0.5, dec: 10, magnitude: 3 }} />
    </StarMapCanvas>
  );
};

export default StarMap;

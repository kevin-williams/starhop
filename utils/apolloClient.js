import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

const hopData = require('../db/hopData.json');
const messier = require('../db/messier.json');
const starCatalog = require('../db/hygfull.json');

const resolvers = {
  Query: {
    hops: () => {
      return hopData.hops;
    },
    dsos: () => {
      return messier.dsos;
    },
    stars: () => {
      return starCatalog.stars;
    }
  }
};

const defaults = {
  location: {
    ra: 0,
    dec: 0,
    __typename: 'location'
  },
  selectedHop: {
    id: '',
    hint: '',
    description: '',
    difficulty: '',
    startingLocation: [],
    targetLocation: {
      ra: 0,
      dec: 0,
      __typename: 'targetLocation'
    },
    __typename: 'selectedHop'
  }
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ fetch }),
  resolvers
});

export default client;

const reset = () => {
  client.writeData({
    data: {
      ...defaults
    }
  });
};

reset();

client.onResetStore(() => reset());

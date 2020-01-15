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
    dsos: (obj, args, context, info) => {
      console.log('getting Dsos', args.input);
      const { raFrom, raTo, decFrom, decTo } = args.input;
      return messier.dsos.filter(
        dso =>
          Number(dso.ra) >= raFrom &&
          Number(dso.ra) <= raTo &&
          Number(dso.dec) >= decFrom &&
          Number(dso.dec) <= decTo
      );
    },
    stars: (obj, args, context, info) => {
      console.log('getting stars', args.input);
      const { raFrom, raTo, decFrom, decTo } = args.input;
      return starCatalog.stars.filter(
        stars =>
          Number(stars.ra) >= raFrom &&
          Number(stars.ra) <= raTo &&
          Number(stars.dec) >= decFrom &&
          Number(stars.dec) <= decTo
      );
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
    starMapQuery: {
      raFrom: 0,
      raTo: 0,
      decFrom: 0,
      decTo: 0,
      __typename: 'starMapQuery'
    },
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

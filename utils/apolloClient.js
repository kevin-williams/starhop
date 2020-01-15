import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { createHttpLink } from 'apollo-link-http';

const resolvers = {};

const defaults = {
  hopSelection: {
    __typename: 'hopSelection'
  },
  location: {
    ra: 0,
    dec: 0,
    __typename: 'location'
  }
};

const link = createHttpLink({ fetch });

export const client = new ApolloClient({
  link,

  resolvers
});

export default client;

export const reset = () => {
  client.writeData({
    data: {
      ...defaults
    }
  });
};

reset();

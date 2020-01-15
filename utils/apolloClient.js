import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

const resolvers = {
  Query: {
    dsos: (obj, args, context, info) => {
      console.log('getting Dsos', obj, args, context, info);
      const { raFrom, raTo, decFrom, decTo } = args;
      return [];
    }
  }
};

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

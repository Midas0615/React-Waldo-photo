import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://core-graphql.dev.waldo.photos/pizza' }),
});

export default client;

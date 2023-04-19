import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.VITE_BASE_URL + '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: false,
            merge(existing, incoming) {
              const existingData =
                !existing || typeof existing.posts[Symbol.iterator] !== 'function' ? { posts: [] } : existing;
              const newArr = [...existingData.posts, ...incoming.posts];
              return {
                posts: newArr,
              };
            },
          },
        },
      },
    },
  }),
  credentials: 'include',
});

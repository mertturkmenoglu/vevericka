import { graphql } from '../../generated';

export const feedQueryDocument = graphql(/* GraphQL */ `
  query Feed($skip: Int!, $take: Int!) {
    feed(skip: $skip, take: $take) {
      posts {
        ...PostItem
      }
    }
  }
`);

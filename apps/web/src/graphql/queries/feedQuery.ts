import { graphql } from '../../generated';

export const feedQueryDocument = graphql(/* GraphQL */ `
  query feedQuery($skip: Int, $take: Int) {
    feed(skip: $skip, take: $take) {
      posts {
        ...PostFragment
      }
    }
  }
`);

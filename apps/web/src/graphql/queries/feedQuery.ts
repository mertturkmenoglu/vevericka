import { graphql } from '../../generated';

export const feedQueryDocument = graphql(/* GraphQL */ `
  query feedQuery($id: Float!, $skip: Int, $take: Int) {
    feed(id: $id, skip: $skip, take: $take) {
      posts {
        id
        content
        user {
          id
          username
          email
          name
          image
          verified
        }
        createdAt
        updatedAt
      }
    }
  }
`);

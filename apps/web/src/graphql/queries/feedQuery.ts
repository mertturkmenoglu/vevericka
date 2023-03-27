import { graphql } from '../../generated';

export const feedQueryDocument = graphql(/* GraphQL */ `
  query feedQuery($id: String!, $skip: Int, $take: Int) {
    feed(id: $id, skip: $skip, take: $take) {
      posts {
        id
        content
        user {
          ...UserFragment
        }
        createdAt
        updatedAt
      }
    }
  }
`);

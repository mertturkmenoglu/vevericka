import { graphql } from '../../generated';

export const userQueryDocument = graphql(/* GraphQL */ `
  query GetUserById($id: String!) {
    user(id: $id) {
      ...UserFragment
    }
  }
`);

import { graphql } from '../../generated';

export const userQueryDocument = graphql(/* GraphQL */ `
  query User($id: String!) {
    user(id: $id) {
      ...UserItem
    }
  }
`);

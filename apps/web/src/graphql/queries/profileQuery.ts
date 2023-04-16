import { graphql } from '../../generated';

export const profileQueryDocument = graphql(/* GraphQL */ `
  query GetProfileById($id: String!) {
    profile(id: $id) {
      ...ProfileFragment
    }
  }
`);

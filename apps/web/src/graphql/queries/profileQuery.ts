import { graphql } from '../../generated';

export const profileQueryDocument = graphql(/* GraphQL */ `
  query ProfileById($id: String!) {
    profile(id: $id) {
      ...ProfileItem
    }
  }
`);

import { graphql } from '../../generated';

export const profileDataQueryDocument = graphql(/* GraphQL */ `
  query ProfileData($id: String!, $skip: Int!, $take: Int!) {
    profile(id: $id) {
      ...ProfileItem
    }

    posts(id: $id, skip: $skip, take: $take) {
      ...PostItem
    }
  }
`);

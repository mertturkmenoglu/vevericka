import { graphql } from '../../generated';

export const profileDataQueryDocument = graphql(/* GraphQL */ `
  query GetProfileData($id: String!, $skip: Int!, $take: Int!) {
    profile(id: $id) {
      ...ProfileFragment
    }

    posts(id: $id, skip: $skip, take: $take) {
      ...PostFragment
    }
  }
`);

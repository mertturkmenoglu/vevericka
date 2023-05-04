import { graphql } from '../../generated';

export const postsQueryDocument = graphql(/* GraphQL */ `
  query Posts($id: String!, $skip: Int!, $take: Int!) {
    posts(id: $id, skip: $skip, take: $take) {
      ...PostItem
    }
  }
`);

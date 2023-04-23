import { graphql } from '../../generated';

export const postQueryDocument = graphql(/* GraphQL */ `
  query Post($id: String!) {
    post(id: $id) {
      ...PostItem
    }
  }
`);

import { graphql } from '../../generated';

export const deletePostDocument = graphql(/* GraphQL */ `
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      ...PostItem
    }
  }
`);

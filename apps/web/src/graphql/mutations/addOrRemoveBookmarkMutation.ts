import { graphql } from '../../generated';

export const addOrRemoveBookmarkDocument = graphql(/* GraphQL */ `
  mutation AddOrRemoveBookmark($id: String!) {
    addOrRemoveBookmark(postId: $id) {
      id
      post {
        ...PostItem
      }
    }
  }
`);

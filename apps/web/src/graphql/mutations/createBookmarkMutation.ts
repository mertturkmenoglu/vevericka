import { graphql } from '../../generated';

export const createBookmarkDocument = graphql(/* GraphQL */ `
  mutation CreateBookmark($payload: NewBookmarkInput!) {
    createBookmark(newBookmarkData: $payload) {
      id
      post {
        ...PostItem
      }
    }
  }
`);

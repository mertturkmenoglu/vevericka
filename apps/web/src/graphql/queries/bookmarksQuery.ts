import { graphql } from '../../generated';

export const bookmarksQueryDocument = graphql(/* GraphQL */ `
  query GetUserBookmarks($skip: Int, $take: Int) {
    bookmarks(skip: $skip, take: $take) {
      id
      post {
        ...PostFragment
      }
    }
  }
`);

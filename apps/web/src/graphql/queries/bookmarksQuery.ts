import { graphql } from '../../generated';

export const bookmarksQueryDocument = graphql(/* GraphQL */ `
  query Bookmarks($skip: Int!, $take: Int!) {
    bookmarks(skip: $skip, take: $take) {
      id
      post {
        ...PostItem
      }
    }
  }
`);

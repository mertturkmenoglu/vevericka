import { graphql } from '../../generated';

export const searchPostsQueryDocument = graphql(/* GraphQL */ `
  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {
    searchPosts(term: $term, take: $take, skip: $skip) {
      ...PostItem
    }
  }
`);

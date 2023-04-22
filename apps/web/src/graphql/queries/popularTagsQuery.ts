import { graphql } from '../../generated';

export const popularTagsQueryDocument = graphql(/* GraphQL */ `
  query PopularTags($skip: Int!, $take: Int!) {
    popularTags(skip: $skip, take: $take) {
      id
      tagName
      _count {
        posts
      }
      createdAt
      updatedAt
    }
  }
`);

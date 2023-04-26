import { graphql } from '../../generated';

export const postsByTagQueryDocument = graphql(/* GraphQL */ `
  query PostsByTag($tag: String!, $skip: Int!, $take: Int!) {
    postsByTag(tag: $tag, skip: $skip, take: $take) {
      ...PostItem
    }
  }
`);

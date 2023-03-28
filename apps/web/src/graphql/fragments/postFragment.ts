import { graphql } from '../../generated';

export const postFragmentDocument = graphql(/* GraphQL */ `
  fragment PostFragment on Post {
    id
    content
    tags {
      id
      tagName
      createdAt
      updatedAt
    }
    images {
      id
      url
      postId
      createdAt
      updatedAt
    }
    videos {
      id
      url
      postId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    user {
      ...UserFragment
    }
  }
`);

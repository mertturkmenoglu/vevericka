import { graphql } from '../../generated';

export const postFragmentDocument = graphql(/* GraphQL */ `
  fragment PostFragment on Post {
    id
    content
    _count {
      ...CountFragment
    }
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
    vote
    createdAt
    updatedAt
    user {
      ...UserFragment
    }
  }
`);

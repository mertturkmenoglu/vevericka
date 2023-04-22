import { graphql } from '../../generated';

export const PostFragment = graphql(/* GraphQL */ `
  fragment PostItem on Post {
    id
    content
    _count {
      ...CountItem
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
      ...UserItem
    }
  }
`);

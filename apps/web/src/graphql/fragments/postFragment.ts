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
      tag
    }
    images {
      id
      url
    }
    videos {
      id
      url
    }
    vote
    createdAt
    updatedAt
    user {
      ...UserItem
    }
  }
`);

import { graphql } from '../../generated';

export const createPostDocument = graphql(/* GraphQL */ `
  mutation CreatePost($payload: NewPostInput!) {
    createPost(newPostData: $payload) {
      ...PostFragment
    }
  }
`);

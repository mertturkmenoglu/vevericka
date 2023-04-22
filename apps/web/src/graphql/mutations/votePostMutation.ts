import { graphql } from '../../generated';

export const votePostDocument = graphql(/* GraphQL */ `
  mutation VotePost($id: String!, $vote: String!) {
    votePost(id: $id, vote: $vote) {
      ...PostItem
    }
  }
`);

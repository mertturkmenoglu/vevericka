import { graphql } from '../../generated';

export const countFragmentDocument = graphql(/* GraphQL */ `
  fragment CountFragment on Count {
    dislikes
    likes
    tags
    comments
  }
`);

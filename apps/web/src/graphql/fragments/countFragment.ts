import { graphql } from '../../generated';

export const CountFragment = graphql(/* GraphQL */ `
  fragment CountItem on Count {
    dislikes
    likes
    tags
    comments
  }
`);

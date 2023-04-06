import { graphql } from '../../generated';

export const updateLastSeenDocument = graphql(/* GraphQL */ `
  mutation UpdateLastSeen {
    updateLastSeen
  }
`);

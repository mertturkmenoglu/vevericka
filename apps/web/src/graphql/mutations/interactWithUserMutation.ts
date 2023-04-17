import { graphql } from '../../generated';

export const interactWithUserDocument = graphql(/* GraphQL */ `
  mutation InteractWithUserMutation($followeeId: String!, $interaction: String!) {
    interactWithUser(id: $followeeId, interaction: $interaction)
  }
`);

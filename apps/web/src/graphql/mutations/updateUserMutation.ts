import { graphql } from '../../generated';

export const updateUserMutationDocument = graphql(/* GraphQL */ `
  mutation UpdateUserMutation($payload: UpdateUserInput!) {
    updateUser(payload: $payload) {
      ...UserFragment
    }
  }
`);

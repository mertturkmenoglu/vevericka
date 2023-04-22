import { graphql } from '../../generated';

export const meQueryDocument = graphql(/* GraphQL */ `
  query Me {
    me {
      ...UserItem
    }
  }
`);

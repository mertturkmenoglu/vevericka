import { graphql } from '../../generated';

export const searchUsersQueryDocument = graphql(/* GraphQL */ `
  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {
    searchUsers(term: $term, take: $take, skip: $skip) {
      ...UserFragment
    }
  }
`);

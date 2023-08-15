import { graphql } from '../../generated';

export const UserFragment = graphql(/* GraphQL */ `
  fragment UserItem on User {
    id
    name
    email
    image
    job
    twitterHandle
    school
    birthDate
    website
    description
    verified
    protected
    banner
    gender
    location
    createdAt
    updatedAt
  }
`);

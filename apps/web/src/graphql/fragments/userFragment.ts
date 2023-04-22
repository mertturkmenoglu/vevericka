import { graphql } from '../../generated';

export const UserFragment = graphql(/* GraphQL */ `
  fragment UserItem on User {
    id
    name
    image
    job
    twitterHandle
    school
    birthDate
    website
    description
    verified
    protected
    bannerImage
    gender
    genderOther
    city
    country
    createdAt
    updatedAt
  }
`);

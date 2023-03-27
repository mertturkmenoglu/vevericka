import { graphql } from '../../generated';

export const userFragmentDocument = graphql(/* GraphQL */ `
  fragment UserFragment on User {
    id
    username
    email
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

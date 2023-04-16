import { graphql } from '../../generated';

export const profileFragmentDocument = graphql(/* GraphQL */ `
  fragment ProfileFragment on Profile {
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
    _count {
      followers
      following
      posts
    }
  }
`);

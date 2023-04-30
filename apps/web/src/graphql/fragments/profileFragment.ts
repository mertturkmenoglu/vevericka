import { graphql } from '../../generated';

export const ProfileFragment = graphql(/* GraphQL */ `
  fragment ProfileItem on Profile {
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
    bannerImage
    gender
    city
    country
    isFollowing
    isMe
    createdAt
    updatedAt
    _count {
      followers
      following
      posts
    }
  }
`);

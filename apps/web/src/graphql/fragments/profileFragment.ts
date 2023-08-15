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
    banner
    gender
    location
    meta {
      hasPendingFollowRequest
      isFollowing
      isMe
      count {
        followers
        following
        posts
      }
    }
    createdAt
    updatedAt
  }
`);

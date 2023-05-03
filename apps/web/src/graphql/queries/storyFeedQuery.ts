import { graphql } from '../../generated';

export const storyFeedQueryDocument = graphql(/* GraphQL */ `
  query StoryFeed {
    storyFeed {
      ...StoryFeedItem
    }
  }
`);

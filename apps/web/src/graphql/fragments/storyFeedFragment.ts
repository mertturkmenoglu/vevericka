import { graphql } from '../../generated';

export const StoryFeedFragment = graphql(/* GraphQL */ `
  fragment StoryFeedItem on StoryFeedElement {
    user {
      ...UserItem
    }
    stories {
      ...StoryItem
    }
    hasSeenAll
  }
`);

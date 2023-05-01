import { graphql } from '../../generated';

export const storiesQueryDocument = graphql(/* GraphQL */ `
  query Stories($id: String!) {
    stories(id: $id) {
      ...StoryItem
    }
  }
`);

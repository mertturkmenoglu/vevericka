import { graphql } from '../../generated';

export const deleteStoryDocument = graphql(/* GraphQL */ `
  mutation DeleteStory($id: String!) {
    deleteStory(id: $id) {
      ...StoryItem
    }
  }
`);

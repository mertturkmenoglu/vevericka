import { graphql } from '../../generated';

export const linkPreviewQueryDocument = graphql(/* GraphQL */ `
  query LinkPreview($url: String!) {
    linkPreview(url: $url) {
      title
      description
      image
      url
    }
  }
`);

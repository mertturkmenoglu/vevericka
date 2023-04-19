import { graphql } from '../../generated';

export const linkPreviewQueryDocument = graphql(/* GraphQL */ `
  query LinkPreviewQuery($url: String!) {
    linkPreview(url: $url) {
      title
      description
      image
      url
    }
  }
`);

import { ContentfulMedia } from '@services/index';

export interface Playlist {
  title: string;

  subtitle: string;

  thumbnail: ContentfulMedia;

  startsAt: string;

  endsAt: string;

  content: string;

  author: {
    metadata: {
      tags: unknown[];
    };

    sys: {
      space: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };

      id: string;

      type: string;

      createdAt: string;

      updatedAt: string;

      environment: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };

      revision: number;

      contentType: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };

      locale: string;
    };

    fields: {
      firstName: string;
      lastName: string;
      profilePicture: {
        metadata: {
          tags: unknown[];
        };
        sys: {
          space: {
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          };
          id: string;
          type: string;
          createdAt: string;
          updatedAt: string;
          environment: {
            sys: {
              id: string;
              type: string;
              linkType: string;
            };
          };
          revision: number;
          locale: string;
        };
        fields: {
          title: string;
          description: string;
          file: {
            url: string;
            details: {
              size: number;
              image: {
                width: number;
                height: number;
              };
            };
            fileName: string;
            contentType: string;
          };
        };
      };
      jobTitle: string;
      location: {
        lon: number;
        lat: number;
      };
      joinDate: string;
      department: string;
      description: {
        data: unknown;
        content: {
          data: unknown;
          content: {
            data: unknown;
            marks: unknown[];
            value: string;
            nodeType: string;
          }[];

          nodeType: string;
        }[];

        nodeType: string;
      };
      socialLinks: string[];
    };
  };
}

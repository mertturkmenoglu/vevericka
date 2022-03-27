export interface IContentfulMedia {
  metadata: unknown;

  sys: unknown;

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
}

export type TMentionEntity = {
  username: string;
  start: number;
  end: number;
  referenceId: string | null;
};

export type TTagEntity = {
  id: string;
  tag: string;
  start: number;
  end: number;
};

export type TUrlEntity = {
  url: string;
  start: number;
  end: number;
  meta: {
    title: string | null;
    description: string | null;
    image: string | null;
  };
};

export type TTextMeta = {
  mentions: TMentionEntity[];
  tags: TTagEntity[];
  urls: TUrlEntity[];
};

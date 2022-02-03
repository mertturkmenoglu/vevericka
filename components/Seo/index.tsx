export interface SeoProps {
  title: string;
  description: string;
  og: OgProps;
  twitter: TwitterProps;
}

export interface OgProps {
  siteName: string;
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  locale: string;
}

export interface TwitterProps {
  card: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  creator: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, og, twitter }) => {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,viewport-fit=cover"
      />
      <meta name="title" content={title} />
      <meta property="description" content={description} />
      <meta property="og:site_name" content={og.siteName} />
      <meta property="og:title" content={og.title} />
      <meta property="og:description" content={og.description} />
      <meta property="og:image" content={og.image} />
      <meta property="og:url" content={og.url} />
      <meta property="og:type" content={og.type} />
      <meta property="og:locale" content={og.locale} />
      <meta name="twitter:card" content={twitter.card} />
      <meta name="twitter:title" content={twitter.title} />
      <meta name="twitter:description" content={twitter.description} />
      <meta name="twitter:image" content={twitter.image} />
      <meta name="twitter:image:alt" content={twitter.imageAlt} />
      <meta name="twitter:creator" content={twitter.creator} />
    </>
  );
};

export default Seo;

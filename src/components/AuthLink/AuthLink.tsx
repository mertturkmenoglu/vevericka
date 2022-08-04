import NextLink, { LinkProps } from 'next/link';

export interface AuthLinkComponentProps {
  text: string;
  cta: string;
}

export type AuthLinkProps = React.PropsWithChildren<LinkProps> & AuthLinkComponentProps;

function AuthLink({ text, cta, ...rest }: AuthLinkProps): JSX.Element {
  return (
    <NextLink {...rest}>
      <a>
        <span className="text-midnight dark:text-gray-400">{text}</span>{' '}
        <span className="text-primary hover:underline">{cta}</span>
      </a>
    </NextLink>
  );
}

export default AuthLink;

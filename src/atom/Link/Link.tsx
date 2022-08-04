import NextLink from 'next/link';
import type { LinkProps } from './Link.type';

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;

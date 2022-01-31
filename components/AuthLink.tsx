import Link from 'next/link';

export interface AuthLinkProps {
  href: string;
  text: string;
  cta: string;
}

const AuthLink = ({ href, text, cta }: AuthLinkProps) => {
  return (
    <Link href={href}>
      <a>
        <span className="text-midnight dark:text-gray-400">{text}</span>{' '}
        <span className="text-primary hover:underline">{cta}</span>
      </a>
    </Link>
  );
};

export default AuthLink;

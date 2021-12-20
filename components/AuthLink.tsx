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
        {text}{' '}<span className="text-deep-orange hover:underline">{cta}</span>
      </a>
    </Link>
  );
};

export default AuthLink;

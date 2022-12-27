import type { Icon as IconType } from 'react-bootstrap-icons';

export interface SocialIconProps {
  href: string;
  icon: IconType;
}

function SocialIcon({ href, icon: Icon }: SocialIconProps): JSX.Element {
  return (
    <li>
      <a href={href}>
        <Icon
          size={16}
          color="#666"
        />
      </a>
    </li>
  );
}

export default SocialIcon;

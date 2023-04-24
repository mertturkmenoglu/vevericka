import { Link } from 'react-router-dom';

export interface NavigationItemProps {
  href: string;
  text: string;
}

function NavigationItem({ href, text }: NavigationItemProps): JSX.Element {
  return (
    <li>
      <Link
        to={href}
        className="text-sm text-gray-600 hover:underline dark:text-gray-400"
      >
        {text}
      </Link>
    </li>
  );
}

export default NavigationItem;

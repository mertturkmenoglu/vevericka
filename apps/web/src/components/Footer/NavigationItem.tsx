export interface NavigationItemProps {
  href: string;
  text: string;
}

function NavigationItem({ href, text }: NavigationItemProps): JSX.Element {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-gray-600 hover:underline"
      >
        {text}
      </a>
    </li>
  );
}

export default NavigationItem;

import React, { useMemo } from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

export interface ItemProps {
  text: string;
  as: 'button' | 'link';
  href?: string;
  onClick?: () => void | Promise<void>;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

function Item({ as, href = '/', text, onClick, icon: Icon }: ItemProps): JSX.Element {
  const content = (
    <>
      <Icon className="h-5 w-5 text-berry" />
      <span className="ml-2 text-sm font-medium text-midnight">{text}</span>
    </>
  );

  const className = 'my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-berry hover:bg-opacity-10';

  const body = useMemo(() => {
    if (as === 'link') {
      return (
        <Link
          to={href}
          className={className}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        onClick={onClick}
        className={className}
      >
        {content}
      </button>
    );
  }, [as, href, className, content, onClick]);

  return <Menu.Item>{() => <>{body}</>}</Menu.Item>;
}

export default Item;

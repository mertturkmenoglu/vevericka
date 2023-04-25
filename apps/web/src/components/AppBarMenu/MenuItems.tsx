import {
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  BookmarkIcon,
  BookOpenIcon,
  CloudIcon,
  Cog8ToothIcon,
  FlagIcon,
  HashtagIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from '../../generated';
import { MeQuery } from '../../generated/graphql';
import { UserFragment } from '../../graphql';
import Copyright from './Copyright';
import Item from './Item';
import ThemeToggle from './ThemeToggle';

export interface MenuItemsProps {
  className?: string;
  userData: MeQuery;
}

function MenuItems({ className, userData }: MenuItemsProps): JSX.Element {
  const me = useFragment(UserFragment, userData.me);

  return (
    <div className={clsx(className)}>
      <div className="px-2 py-1">
        <Item
          as="link"
          href={`/u/${me.id}`}
          text="Profile"
          icon={UserIcon}
        />

        <Item
          as="link"
          href="/explore"
          text="Explore"
          icon={HashtagIcon}
        />

        <Item
          as="link"
          href="/bookmarks"
          text="Bookmarks"
          icon={BookmarkIcon}
        />

        <Item
          as="link"
          href="/settings"
          text="Settings"
          icon={Cog8ToothIcon}
        />

        <ThemeToggle />

        <Item
          as="button"
          text="Logout"
          onClick={async () => {
            await fetch('http://localhost:3000/oauth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });

            window.location.replace('/');
          }}
          icon={ArrowRightOnRectangleIcon}
        />
      </div>

      <div className="px-2 py-1">
        <Item
          as="link"
          href="/help"
          text="Help"
          icon={QuestionMarkCircleIcon}
        />

        <Item
          as="link"
          href="/contact"
          text="Contact"
          icon={AtSymbolIcon}
        />

        <Item
          as="link"
          href="/report"
          text="Report"
          icon={FlagIcon}
        />

        <Item
          as="link"
          href="/terms"
          text="Terms"
          icon={BookOpenIcon}
        />

        <Item
          as="link"
          href="/privacy"
          text="Privacy"
          icon={LockClosedIcon}
        />
      </div>

      <div className="px-2 py-1">
        <Item
          as="link"
          href="https://vevericka.statuspage.io/"
          text="Status"
          icon={CloudIcon}
        />
      </div>

      <Copyright />
    </div>
  );
}

export default MenuItems;

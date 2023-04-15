import React from 'react';
import clsx from 'clsx';

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
import Item from './Item';
import Copyright from './Copyright';
import { useFragment } from '../../generated';
import { MeQuery } from '../../generated/graphql';
import { userFragmentDocument } from '../../graphql';

export interface MenuItemsProps {
  className?: string;
  userData: MeQuery;
}

function MenuItems({ className, userData }: MenuItemsProps): JSX.Element {
  const me = useFragment(userFragmentDocument, userData.me);

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

        <Item
          as="button"
          text="Logout"
          onClick={async () => {
            // TODO: Fix cookie clearing bug
            await fetch('http://localhost:3000/oauth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            window.location.href = '/';
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

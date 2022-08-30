import React from 'react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { BellIcon, EnvelopeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SingleIcon from './SingleIcon';

export interface IconGroupProps {
  className?: string;
}

function IconGroup({ className }: IconGroupProps): JSX.Element {
  const { t } = useTranslation('common');

  const icons = [
    {
      Icon: MagnifyingGlassIcon,
      href: '/search',
      isMobileOnly: false,
      tooltip: t('appBar.icons.tooltips.search'),
    },
    {
      Icon: BellIcon,
      href: '/notifications',
      isMobileOnly: false,
      tooltip: t('appBar.icons.tooltips.notifications'),
    },
    {
      Icon: EnvelopeIcon,
      href: '/messages',
      isMobileOnly: false,
      tooltip: t('appBar.icons.tooltips.messages'),
    },
  ];

  return (
    <ul className={clsx('flex items-center', className)}>
      {icons.map((icon) => (
        <li key={icon.href}>
          <SingleIcon {...icon} />
        </li>
      ))}
    </ul>
  );
}

export default IconGroup;

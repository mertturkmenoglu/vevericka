import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { TagWithCount } from '@service/common/models/TagWithCount';
import { addResourceBundles, getNumberFormatter } from '@utils/index';
import constants from './Explore.constants';
import { translations } from './Explore.i18n';

export interface TagItemProps {
  tag: TagWithCount;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  const router = useRouter();
  const numberFormatter = useMemo(() => getNumberFormatter(router.locale), [router]);
  const formattedPostsCount = useMemo(() => numberFormatter.format(tag._count.posts), [tag, numberFormatter]);
  const postsCountText = useMemo(() => `${formattedPostsCount} ${t('posts')}`, [formattedPostsCount, t]);

  return (
    <Link href={`/explore/${tag.tagName}`}>
      <a
        className={clsx(
          'flex items-center justify-between',
          'w-full px-2 py-1',
          'text-midnight dark:text-gray-400',
          'outline-midnight dark:outline-paper-100',
          'rounded-full',
          'transition duration-200 ease-in-out',
          'hover:bg-paper-100 dark:hover:bg-paper-400',
        )}
      >
        <span className="text-sm">
          <span className="text-base font-bold text-primary">#</span>
          <span className="ml-2">{tag.tagName}</span>
        </span>
        <span className="text-xs">{postsCountText}</span>
      </a>
    </Link>
  );
};

export default TagItem;

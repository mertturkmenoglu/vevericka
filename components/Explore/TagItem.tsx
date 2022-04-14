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
          'outline-primary',
          'hover:rounded-full hover:bg-primary hover:bg-opacity-10',
          'focus:rounded-full focus:bg-primary focus:bg-opacity-10',
        )}
      >
        <span className="text-sm">
          <span className="text-base font-bold text-primary">#</span>
          <span className="ml-2 hover:underline focus:underline">{tag.tagName}</span>
        </span>
        <span className="text-xs hover:underline focus:underline">{postsCountText}</span>
      </a>
    </Link>
  );
};

export default TagItem;

import Link from 'next/link';
import React from 'react';
import { TagWithCount } from '@service/common/models/TagWithCount';

export interface TagItemProps {
  tag: TagWithCount;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <Link href={`/explore/${tag.tagName}`}>
      <a className="flex w-full items-end justify-between text-midnight outline-midnight dark:text-gray-400">
        <span className="text-sm">
          <span className="text-base font-bold text-primary">#</span>
          <span className="ml-2 hover:underline focus:underline">{tag.tagName}</span>
        </span>
        <span className="text-xs hover:underline focus:underline">{tag._count.posts} posts</span>
      </a>
    </Link>
  );
};

export default TagItem;

import Link from 'next/link';
import React, { useCallback } from 'react';
import { MinimalUserResponse } from '@service/common/models';

export interface FollowUserItemProps {
  user: MinimalUserResponse;
}

const FollowUserItem: React.FC<FollowUserItemProps> = ({ user }) => {
  const image = useCallback((s: string) => (s === 'profile.png' ? '/assets/profile.png' : s), []);
  return (
    <div className="flex items-center justify-between">
      <Link href={`/user/${user.username}`}>
        <a className="flex w-full items-center justify-start text-midnight outline-midnight dark:text-gray-400">
          <img src={image(user.image)} alt="" className="h-10 w-10 rounded-full" />
          <div className="ml-2 flex flex-col text-base">
            <span className="w-48 truncate text-base font-bold">{user.name}</span>
            <div>
              <span className="text-base font-bold text-primary">@</span>
              <span className="ml-1 hover:underline focus:underline">{user.username}</span>
            </div>
          </div>
        </a>
      </Link>
      <button className="flex items-center justify-center rounded-full bg-midnight py-1 px-4 text-sm text-white outline-primary duration-100 ease-in-out hover:scale-[1.01]">
        Follow
      </button>
    </div>
  );
};

export default FollowUserItem;

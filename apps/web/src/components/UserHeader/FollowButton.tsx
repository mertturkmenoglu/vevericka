import { PlusIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Spinner } from '../index';

export interface FollowButtonProps {
  isFollowing: boolean;
  hasPendingFollowRequest: boolean;
  loading: boolean;
  onClick: () => Promise<void>;
}

function FollowButton({ isFollowing, hasPendingFollowRequest, loading, onClick }: FollowButtonProps): JSX.Element {
  const followText = useMemo(() => {
    if (hasPendingFollowRequest) {
      return 'Pending';
    }

    return isFollowing ? 'Following' : 'Follow';
  }, [hasPendingFollowRequest, isFollowing]);

  const Icon = isFollowing || hasPendingFollowRequest ? <></> : <PlusIcon className="h-5 w-5 text-white" />;

  return (
    <button
      className="flex items-center rounded bg-midnight px-4 py-2 text-white transition ease-in-out hover:bg-midnight/90 dark:bg-neutral-800 dark:hover:bg-neutral-800/80"
      onClick={onClick}
    >
      {!loading && (
        <>
          {Icon}
          <span className="ml-2">{followText}</span>
        </>
      )}
      {loading && <Spinner />}
    </button>
  );
}

export default FollowButton;

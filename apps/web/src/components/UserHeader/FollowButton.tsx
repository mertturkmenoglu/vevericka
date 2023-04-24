import { PlusIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../index';

export interface FollowButtonProps {
  isFollowing: boolean;
  loading: boolean;
  onClick: () => Promise<void>;
}

function FollowButton({ isFollowing, loading, onClick }: FollowButtonProps): JSX.Element {
  const followText = isFollowing ? 'Following' : 'Follow';
  const Icon = isFollowing ? <></> : <PlusIcon className="h-5 w-5 text-white" />;

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

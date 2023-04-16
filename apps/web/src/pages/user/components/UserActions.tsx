import { PlusIcon } from '@heroicons/react/24/outline';
import { ProfileFragmentFragment } from '../../../generated/graphql';
import { useAppStore } from '../../../stores';
import { Link } from 'react-router-dom';

export interface UserActionsProps {
  user: ProfileFragmentFragment;
}

function UserActions({ user }: UserActionsProps): JSX.Element {
  const appUser = useAppStore((state) => state.user);

  const isThisUser = appUser?.id === user.id;

  return (
    <>
      {!isThisUser && (
        <>
          <button className="flex items-center rounded bg-midnight px-4 py-2 text-white transition ease-in-out hover:bg-midnight/90">
            <PlusIcon className="h-5 w-5 text-white" />
            <span className="ml-2">Follow</span>
          </button>

          <button className="rounded bg-neutral-200 px-4 py-2 text-neutral-600 transition ease-in-out hover:bg-neutral-200/60">
            Message
          </button>
        </>
      )}
      {isThisUser && (
        <Link
          to={'/settings'}
          className="rounded bg-neutral-200 px-4 py-2 text-neutral-600 transition ease-in-out hover:bg-neutral-200/60"
        >
          Settings
        </Link>
      )}
    </>
  );
}

export default UserActions;

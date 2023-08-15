// import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import { Twitter } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { ProfileItemFragment } from '../../generated/graphql';
// import { interactWithUserDocument } from '../../graphql';
import FollowButton from './FollowButton';

export interface UserActionsProps {
  user: ProfileItemFragment;
}

function UserActions({ user }: UserActionsProps): JSX.Element {
  // const [interact, { loading }] = useMutation(interactWithUserDocument);

  const linkStyles = clsx(
    'rounded bg-neutral-200',
    'px-4 py-2 text-neutral-600',
    'transition ease-in-out',
    'hover:bg-opacity-60',
    'dark:bg-neutral-600 dark:text-neutral-200'
  );

  return (
    <>
      {user.twitterHandle && (
        <Link
          to={`https://twitter.com/${user.twitterHandle}`}
          target="_blank"
          className=""
        >
          <Twitter className="h-6 w-6 text-[#00acee]" />
        </Link>
      )}
      {!user.meta.isMe && (
        <>
          <FollowButton
            isFollowing={user.meta.isFollowing}
            hasPendingFollowRequest={user.meta.hasPendingFollowRequest}
            loading={false}
            onClick={async () => {
              if (user.meta.hasPendingFollowRequest) {
                return;
              }

              // const result = await interact({
              //   variables: {
              //     followeeId: user.id,
              //     interaction: user.isFollowing ? 'unfollow' : 'follow',
              //   },
              // });
              // if (result.data?.interactWithUser === 'ok') {
              //   window.location.reload();
              // }
            }}
          />

          {user.meta.isFollowing && (
            <Link
              to={'/messages'}
              className={linkStyles}
            >
              Message
            </Link>
          )}
        </>
      )}
      {user.meta.isMe && (
        <>
          <Link
            to={'/follow-requests'}
            className={linkStyles}
          >
            Follow Requests
          </Link>
          <Link
            to={'/settings'}
            className={linkStyles}
          >
            Settings
          </Link>
        </>
      )}
    </>
  );
}

export default UserActions;

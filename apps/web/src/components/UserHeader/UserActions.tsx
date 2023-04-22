import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ProfileItemFragment } from '../../generated/graphql';
import { interactWithUserDocument } from '../../graphql';
import FollowButton from './FollowButton';

export interface UserActionsProps {
  user: ProfileItemFragment;
}

function UserActions({ user }: UserActionsProps): JSX.Element {
  const [interact, { loading }] = useMutation(interactWithUserDocument);

  return (
    <>
      {!user.isMe && (
        <>
          <FollowButton
            isFollowing={user.isFollowing}
            loading={loading}
            onClick={async () => {
              const result = await interact({
                variables: {
                  followeeId: user.id,
                  interaction: user.isFollowing ? 'unfollow' : 'follow',
                },
              });
              if (result.data?.interactWithUser === 'ok') {
                window.location.reload();
              }
            }}
          />

          {user.isFollowing && (
            <Link
              to={'/messages'}
              className="rounded bg-neutral-200 px-4 py-2 text-neutral-600 transition ease-in-out hover:bg-neutral-200/60"
            >
              Message
            </Link>
          )}
        </>
      )}
      {user.isMe && (
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

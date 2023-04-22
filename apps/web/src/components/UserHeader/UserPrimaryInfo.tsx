import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { ProfileItemFragment } from '../../generated/graphql';

export interface UserPrimaryInfoProps {
  user: ProfileItemFragment;
}

function UserPrimaryInfo({ user }: UserPrimaryInfoProps): JSX.Element {
  return (
    <div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-4xl font-medium">{user.name}</h2>
        {user.verified && <CheckBadgeIcon className="inline h-5 w-5 text-midnight" />}
      </div>

      <div className="mt-2 flex items-center space-x-2">
        <span className="text-neutral-600">{user._count.posts} Posts</span>
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-600">{user._count.followers} Followers</span>
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-600">{user._count.following} Following</span>
      </div>
    </div>
  );
}

export default UserPrimaryInfo;

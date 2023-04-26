import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { LazyImage, TUserFragment } from '..';
import { useFragment } from '../../generated';
import { UserFragment } from '../../graphql';

interface UserCardProps {
  user: TUserFragment;
}

function UserCard({ user }: UserCardProps): JSX.Element {
  const data = useFragment(UserFragment, user);
  return (
    <article>
      <Link
        to={`/u/${data.id}`}
        className={clsx(
          'flex items-center space-x-4 rounded',
          'bg-midnight/10 px-4 py-2 text-midnight',
          'transition duration-200 ease-in-out',
          'group hover:bg-midnight hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-800/80'
        )}
      >
        <LazyImage
          src={data.image}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-16 min-w-16 !m-0 aspect-square h-16 w-16 rounded-full"
        />
        <p className="text-xl text-midnight group-hover:text-white dark:text-white">{data.name}</p>
      </Link>
    </article>
  );
}

export default UserCard;

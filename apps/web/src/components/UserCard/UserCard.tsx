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
        className="flex items-center space-x-4 rounded bg-midnight/10 px-4 py-2 text-midnight transition duration-200 ease-in-out hover:bg-midnight hover:text-white"
      >
        <LazyImage
          src={data.image}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-16 min-w-16 aspect-square h-16 w-16 rounded-full"
        />
        <p className="text-xl">{data.name}</p>
      </Link>
    </article>
  );
}

export default UserCard;

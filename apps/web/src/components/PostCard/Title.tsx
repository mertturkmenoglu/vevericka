import { Link } from 'react-router-dom';
import { useFormattedDate } from './hooks';

export interface TitleProps {
  userId: string;
  name: string;
  postId: string;
  createdAt: string;
}

function Title({ userId, name, postId, createdAt }: TitleProps): JSX.Element {
  const formattedDate = useFormattedDate(createdAt);

  return (
    <div className="flex items-baseline space-x-1">
      <Link
        to={`/u/${userId}`}
        className="text-sm font-semibold tracking-wide text-midnight hover:underline dark:text-white"
      >
        {name}
      </Link>
      <Link
        to={`/p/${postId}`}
        className="text-xs tracking-tighter text-neutral-600 hover:underline dark:text-neutral-400"
      >
        {formattedDate}
      </Link>
    </div>
  );
}

export default Title;

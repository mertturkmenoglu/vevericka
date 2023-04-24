import { Link } from 'react-router-dom';

function More(): JSX.Element {
  return (
    <Link
      to={'/explore'}
      className="mt-2 flex justify-end px-6 text-sm font-semibold text-midnight  dark:text-neutral-200"
    >
      <span className="items-end self-end rounded px-2 py-1 transition duration-200 ease-in-out hover:bg-midnight/10 dark:hover:bg-neutral-600">
        More
      </span>
    </Link>
  );
}

export default More;

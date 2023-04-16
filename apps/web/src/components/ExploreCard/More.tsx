import { Link } from 'react-router-dom';

function More(): JSX.Element {
  return (
    <Link
      to={'/explore'}
      className="mt-2 flex justify-end  px-6 text-sm font-semibold text-midnight"
    >
      <span className="items-end self-end rounded px-2 py-1 hover:bg-midnight/10">More</span>
    </Link>
  );
}

export default More;

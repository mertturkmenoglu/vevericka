import { Spinner } from '..';

export interface CreateButtonProps {
  loading: boolean;
}

function CreateButton({ loading }: CreateButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-min items-center rounded bg-midnight px-4 py-1 text-white transition ease-in-out hover:bg-midnight/90 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-800/90"
    >
      <span>Create</span>
      {loading && <Spinner className="ml-2 h-4 w-4 fill-berry text-gray-200" />}
    </button>
  );
}

export default CreateButton;

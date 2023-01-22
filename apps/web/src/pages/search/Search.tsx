import { AppBar } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Settings(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = decodeURIComponent(searchParams.get('q') ?? '');
  const [userQuery, setUserQuery] = useState(queryFromUrl);

  return (
    <main className="container mx-auto">
      <AppBar className="sm:mt-4" />
      <div className="mt-4 flex w-full justify-between rounded p-2">
        <input
          type="text"
          className="w-10/12 rounded-full border border-midnight/30 py-2 px-4 placeholder:text-midnight/30"
          value={userQuery}
          placeholder="Type anything to search"
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button
          className="w-48 rounded-full bg-midnight py-2 text-white"
          onClick={() => {
            if (userQuery === '') {
              searchParams.delete('q');
            } else {
              searchParams.set('q', encodeURIComponent(userQuery));
            }

            setSearchParams(searchParams);
          }}
        >
          Search
        </button>
      </div>
    </main>
  );
}

export default Settings;

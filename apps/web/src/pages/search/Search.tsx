import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { MainLayout } from '../../layouts';

function Settings(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = decodeURIComponent(searchParams.get('q') ?? '');
  const [userQuery, setUserQuery] = useState(queryFromUrl);

  return (
    <MainLayout>
      <div className="mt-16 flex w-full justify-center space-x-4">
        <input
          type="text"
          className="w-1/3 rounded-md border border-midnight/30 py-2 px-4 placeholder:text-midnight/30"
          value={userQuery}
          placeholder="Type anything to search"
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button
          className="w-48 rounded-md bg-midnight py-2 text-white"
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
    </MainLayout>
  );
}

export default Settings;

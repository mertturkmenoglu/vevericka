import { Loading, NoSearchResults, SearchArea, SearchResult } from '../../components';
import { useSearch } from '../../hooks';
import Layout from './layout';

function Settings(): JSX.Element {
  const { isLoading, isNoResult, onSearch, searchData, setTerm, setType, showResults, term, type } = useSearch();

  return (
    <Layout>
      <SearchArea
        className="mt-8"
        term={term}
        setTerm={setTerm}
        onSearch={onSearch}
        type={type}
        setType={setType}
      />

      {isLoading && <Loading className="mx-auto mt-16" />}

      {isNoResult && <NoSearchResults />}

      {showResults && (
        <div className="mx-auto my-8 flex w-2/3 flex-col space-y-4">
          {searchData?.map((it, index) => (
            <SearchResult
              key={index}
              type={type}
              content={it._source}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Settings;

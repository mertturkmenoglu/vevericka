function NoSearchResults(): JSX.Element {
  return (
    <div className="mx-auto mt-8 text-center text-lg font-medium text-midnight dark:text-white">
      <div>We couldn't find any results</div>
      <div>Try changing your words</div>
    </div>
  );
}

export default NoSearchResults;

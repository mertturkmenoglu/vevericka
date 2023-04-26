import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { PostCard } from '../../components';
import { PostsByTagQuery } from '../../generated/graphql';
import { MainLayout } from '../../layouts';

function TagPage(): JSX.Element {
  const data = useLoaderData() as PostsByTagQuery;
  const { tag } = useParams();

  return (
    <MainLayout>
      <div className="mx-auto w-full lg:w-2/3">
        <Helmet>
          <title>Vevericka</title>
        </Helmet>
        <Link
          to={'/explore'}
          className="flex items-center text-xs text-midnight hover:underline dark:text-neutral-400"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Explore
        </Link>
        <h1 className="mt-4 text-2xl text-berry">#{tag}</h1>
        <hr />
        <div className="mx-auto mt-4 w-3/4 space-y-2">
          {data.postsByTag.map((post) => (
            <PostCard
              post={post}
              key={post[' $fragmentRefs']?.PostItemFragment.id}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default TagPage;

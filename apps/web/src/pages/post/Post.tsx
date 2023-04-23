import React from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import { PostCard } from '../../components';
import { PostQuery } from '../../generated/graphql';
import { MainLayout } from '../../layouts';

function PostPage(): JSX.Element {
  const data = useLoaderData() as PostQuery;

  return (
    <MainLayout>
      <div className="mx-auto w-full lg:w-2/3">
        <Helmet>
          <title>Vevericka</title>
        </Helmet>
        <PostCard post={data.post} />
      </div>
    </MainLayout>
  );
}

export default PostPage;

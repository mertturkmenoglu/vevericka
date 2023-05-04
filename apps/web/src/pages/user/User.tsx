import { useLazyQuery } from '@apollo/client';
import * as Separator from '@radix-ui/react-separator';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Loading, PostCard, UserHeader } from '../../components';
import { useFragment } from '../../generated';
import { ProfileByIdQuery } from '../../generated/graphql';
import { ProfileFragment } from '../../graphql';
import { postsQueryDocument } from '../../graphql/queries/postsQuery';
import Layout from './layout';

function User(): JSX.Element {
  const data = useLoaderData() as ProfileByIdQuery;
  const user = useFragment(ProfileFragment, data.profile);
  const [getPosts, { data: postsData, error, loading }] = useLazyQuery(postsQueryDocument, {
    variables: {
      id: user.id,
      skip: 0,
      take: 50,
    },
  });

  useEffect(() => {
    const fn = async () => {
      if (!user.protected) {
        await getPosts();
      }
    };

    fn();
  }, [user]);

  return (
    <Layout name={user.name}>
      <UserHeader user={user} />

      <Separator.Root
        className="mt-2 h-[1px] w-full bg-neutral-200 dark:bg-neutral-400"
        decorative
        orientation="horizontal"
      />

      <div className="mx-auto mt-8 flex w-1/2">
        <div className="w-full divide-y-2 divide-neutral-100 [&>*]:py-2">
          {loading && <Loading />}
          {error && <div>Error! {error.message}</div>}
          {postsData &&
            postsData.posts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default User;

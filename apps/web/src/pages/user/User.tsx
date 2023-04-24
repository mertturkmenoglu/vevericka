import * as Separator from '@radix-ui/react-separator';
import { useLoaderData } from 'react-router-dom';
import { PostCard, UserHeader } from '../../components';
import { useFragment } from '../../generated';
import { ProfileDataQuery } from '../../generated/graphql';
import { PostFragment, ProfileFragment } from '../../graphql';
import Layout from './layout';

function User(): JSX.Element {
  const data = useLoaderData() as ProfileDataQuery;
  const user = useFragment(ProfileFragment, data.profile);
  const posts = useFragment(PostFragment, data.posts);

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
          {posts.map((post, index) => (
            <PostCard
              key={index}
              post={post as any}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default User;

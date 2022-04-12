import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import ExploreLayout from './ExploreLayout';
import FollowUserItem from './FollowUserItem';
import MoreButton from './MoreButton';
import TagItem from './TagItem';
import { ExploreApi } from '@service/explore/ExploreApi';
import { TagsAndPeople } from '@service/common/models/TagsAndPeople';
import { PaginationQuery } from '@service/common/PaginationQuery';

export interface ExploreProps {}

const Explore: React.FC<ExploreProps> = () => {
  const exploreApi = useMemo(() => new ExploreApi(), []);

  const fetchTagsAndPeople = async () => {
    const tagsAndPeopleResponse = await exploreApi.getPopularTagsAndPeople({
      page: 1,
      pageSize: 5,
      order: 'desc',
    } as PaginationQuery);

    if (!tagsAndPeopleResponse.data) {
      throw tagsAndPeopleResponse.exception;
    }

    return tagsAndPeopleResponse.data;
  };

  const { isLoading, isError, data } = useQuery<TagsAndPeople>('tagsAndPeople', fetchTagsAndPeople);

  return (
    <>
      <ExploreLayout title="Explore" isError={isError} isLoading={isLoading}>
        <div className="mt-2 flex flex-col space-y-2">
          {data && data.tags.data.map((tagObj) => <TagItem tag={tagObj} key={tagObj.tagName} />)}
        </div>
        <div className="mt-4 w-full">
          <MoreButton />
        </div>
      </ExploreLayout>

      <ExploreLayout title="People to follow" isError={isError} isLoading={isLoading} className="mt-2">
        <div className="mt-2 flex flex-col space-y-2">
          {data && data.people.data.map((user) => <FollowUserItem user={user} key={`explore-${user.username}`} />)}
        </div>
      </ExploreLayout>
    </>
  );
};

export default Explore;

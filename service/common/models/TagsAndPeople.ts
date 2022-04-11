import { PaginatedResults } from '../PaginatedResult';
import { MinimalUserResponse } from './MinimalUserResponse';
import { TagWithCount } from './TagWithCount';

export type TagsAndPeople = {
  tags: PaginatedResults<TagWithCount[]>;
  people: PaginatedResults<MinimalUserResponse[]>;
};

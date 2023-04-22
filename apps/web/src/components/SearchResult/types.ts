import { FragmentType } from '../../generated';
import { PostFragment, UserFragment } from '../../graphql';

export type TPostFragment = FragmentType<typeof PostFragment>;
export type TUserFragment = FragmentType<typeof UserFragment>;
export type TContent = TPostFragment | TUserFragment;

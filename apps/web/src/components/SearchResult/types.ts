import { FragmentType } from '../../generated';
import { postFragmentDocument, userFragmentDocument } from '../../graphql';

export type TPostFragment = FragmentType<typeof postFragmentDocument>;
export type TUserFragment = FragmentType<typeof userFragmentDocument>;
export type TContent = TPostFragment | TUserFragment;

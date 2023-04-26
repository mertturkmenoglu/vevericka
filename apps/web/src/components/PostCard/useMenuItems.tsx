import { useMutation } from '@apollo/client';
import { BookmarkIcon, FlagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast, TypeOptions } from 'react-toastify';
import { client } from '../../apollo';
import { useFragment } from '../../generated';
import { PostItemFragment } from '../../generated/graphql';
import { UserFragment } from '../../graphql';
import { addOrRemoveBookmarkDocument } from '../../graphql/mutations/addOrRemoveBookmarkMutation';
import { deletePostDocument } from '../../graphql/mutations/deletePostMutation';
import { useAuth, useTheme } from '../../hooks';

export type UseMenuItemsResult = Array<{
  key: string;
  text: string;
  action: (post: PostItemFragment) => Promise<void> | void;
  icon: TwIcon;
}>;

export function useMenuItems(post: PostItemFragment): UseMenuItemsResult {
  const [theme] = useTheme();
  const [addOrRemoveBookmark] = useMutation(addOrRemoveBookmarkDocument);
  const [deletePost] = useMutation(deletePostDocument);
  const user = useFragment(UserFragment, post.user);
  const { data: auth } = useAuth();
  const me = useFragment(UserFragment, auth?.me);

  const createToast = (message: string, type: TypeOptions) => {
    toast(message, {
      type,
      theme,
      autoClose: 3000,
    });
  };

  const bookmarkAction = async (p: PostItemFragment) => {
    const response = await addOrRemoveBookmark({
      variables: {
        id: p.id,
      },
    });

    if (response.errors) {
      createToast('Something went wrong', 'error');
    } else {
      console.log({ response: response.data });
      createToast('Success', 'success');
      client.refetchQueries({ include: ['Bookmarks'] });
    }
  };

  const deleteAction = async (p: PostItemFragment) => {
    const response = await deletePost({
      variables: {
        id: p.id,
      },
    });

    if (response.errors) {
      createToast('Something went wrong', 'error');
    } else {
      createToast('Success', 'success');
      client.refetchQueries({ include: ['Feed'] });
    }
  };

  if (!me) {
    return [];
  }

  const isThisUser = user.id === me.id;

  const deleteOrReportElement = isThisUser
    ? {
        key: 'delete',
        text: 'Delete',
        action: deleteAction,
        icon: TrashIcon,
      }
    : {
        key: 'report',
        text: 'Report',
        action: () => {},
        icon: FlagIcon,
      };

  return [
    {
      key: 'bookmark',
      text: 'Bookmark',
      action: bookmarkAction,
      icon: BookmarkIcon,
    },
    deleteOrReportElement,
  ].filter(Boolean);
}

import { useMutation } from '@apollo/client';
import { BookmarkIcon, FlagIcon } from '@heroicons/react/24/outline';
import { toast, TypeOptions } from 'react-toastify';
import { client } from '../../apollo';
import { PostItemFragment } from '../../generated/graphql';
import { addOrRemoveBookmarkDocument } from '../../graphql/mutations/addOrRemoveBookmarkMutation';
import { useTheme } from '../../hooks';

export type UseMenuItemsResult = Array<{
  text: string;
  action: (post: PostItemFragment) => Promise<void> | void;
  icon: TwIcon;
}>;

export function useMenuItems(): UseMenuItemsResult {
  const [theme] = useTheme();
  const [addOrRemoveBookmark] = useMutation(addOrRemoveBookmarkDocument);

  const createToast = (message: string, type: TypeOptions) => {
    toast(message, {
      type,
      theme,
      autoClose: 3000,
    });
  };

  const bookmarkAction = async (post: PostItemFragment) => {
    const response = await addOrRemoveBookmark({
      variables: {
        id: post.id,
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

  return [
    {
      text: 'Bookmark',
      action: bookmarkAction,
      icon: BookmarkIcon,
    },
    {
      text: 'Report',
      action: () => {},
      icon: FlagIcon,
    },
  ];
}

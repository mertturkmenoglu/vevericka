import { Menu, Transition } from '@headlessui/react';
import {
  BookmarkIcon,
  ChatAltIcon,
  ClipboardCopyIcon,
  DotsVerticalIcon,
  FlagIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useMemo } from 'react';
import { IPost } from '../backend/models/IPost';
import { preparePostText } from '../utils/Post.utils';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';

export interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { theme } = useTheme();

  const image = useMemo(() => {
    if (post.user.image === 'profile.png') {
      return '/assets/profile.png';
    }

    return post.user.image;
  }, [post]);

  const shareClick = () => {
    const tmpInput = document.createElement('input');
    const base =
      process.env.NODE_ENV === 'production'
        ? 'https://vevericka.app'
        : 'http://localhost:3000';
    tmpInput.value = base + `/post/${post.id}`;
    document.body.appendChild(tmpInput);
    tmpInput.select();
    document.execCommand('copy');
    document.body.removeChild(tmpInput);
    toast.info('Link copied to your clipboard', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <ClipboardCopyIcon className="text-deep-orange w-8 h-8" />,
      theme: theme === 'dark' ? 'dark' : 'light',
    });
  };

  return (
    <article
      key={post.id}
      className="flex flex-col py-4 px-2 bg-white dark:bg-neutral-800 rounded-md w-full"
    >
      {/* Image - Name - Menu */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/user/${post.user.username}`}>
            <a>
              <img
                src={image}
                alt={post.user.name}
                className="w-10 h-10 rounded-full"
              />
            </a>
          </Link>
          <Link href={`/user/${post.user.username}`}>
            <a className="ml-2 text-xl text-slate-700 dark:text-gray-200 hover:underline">
              {post.user.name}
            </a>
          </Link>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="">
              <span className="sr-only">Menu</span>
              <DotsVerticalIcon
                className="w-8 h-8 text-deep-orange ml-2 hover:bg-orange-100 rounded-full p-2 dark:hover:bg-orange-100 dark:hover:bg-opacity-25"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-40 origin-top-right bg-white dark:bg-neutral-700 divide-y divide-gray-100 rounded-md shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-2 py-1">
                <Menu.Item>
                  {() => (
                    <button
                      className="w-full flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25"
                      onClick={shareClick}
                    >
                      <ShareIcon className="w-4 h-4 text-deep-orange" />
                      <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                        Share
                      </span>
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button className="w-full flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                      <BookmarkIcon className="w-4 h-4 text-deep-orange" />
                      <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                        Save
                      </span>
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button className="w-full flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                      <FlagIcon className="w-4 h-4 text-deep-orange" />
                      <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                        Report
                      </span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Content */}
      <p
        className="break-words mt-4 text-slate-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: preparePostText(post.content) }}
      />

      {/* Date - Comments */}
      <div className="flex w-full justify-end mt-2 items-center">
        <Link href={`/post/${post.id}`}>
          <a className="text-xs text-slate-700 dark:text-gray-600 hover:underline">
            {new Date(post.createdAt).toLocaleDateString()}
          </a>
        </Link>
        <button className="flex items-center">
          <ChatAltIcon className="w-4 h-4 text-deep-orange ml-4" />
          <span className="text-xs text-slate-700 font-thin ml-1 dark:text-gray-400">
            {/* {post.comments.length} */}0
            <span className="sr-only">comments</span>
          </span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;

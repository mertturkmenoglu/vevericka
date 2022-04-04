import { Menu, Transition } from '@headlessui/react';
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  ClipboardCopyIcon,
  DotsVerticalIcon,
  FlagIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useMemo } from 'react';
import { preparePostText } from '../utils/Post.utils';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import { FeedPost } from '../service/common/models/FeedPost';

export interface PostCardProps {
  post: FeedPost;
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
    const base = process.env.NODE_ENV === 'production' ? 'https://vevericka.app' : 'http://localhost:3000';
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
      icon: <ClipboardCopyIcon className="h-8 w-8 text-primary" />,
      theme: theme === 'dark' ? 'dark' : 'light',
    });
  };

  return (
    <article key={post.id} className="flex w-full flex-col rounded-md bg-white py-4 px-2 dark:bg-neutral-800">
      {/* Image - Name - Menu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href={`/user/${post.user.username}`}>
            <a>
              <img src={image} alt={post.user.name} className="h-10 w-10 rounded-full" />
            </a>
          </Link>
          <Link href={`/user/${post.user.username}`}>
            <a className="ml-2 text-xl text-slate-700 hover:underline dark:text-gray-200">{post.user.name}</a>
          </Link>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="">
              <span className="sr-only">Menu</span>
              <DotsVerticalIcon
                className="ml-2 h-8 w-8 rounded-full p-2 text-primary hover:bg-primary hover:bg-opacity-10"
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
            <Menu.Items className="absolute right-0 z-50 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-700">
              <div className="px-2 py-1">
                <Menu.Item>
                  {() => (
                    <button
                      className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10"
                      onClick={shareClick}
                    >
                      <ShareIcon className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">Share</span>
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10">
                      <BookmarkIcon className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">Save</span>
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10">
                      <FlagIcon className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">Report</span>
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
        className="mt-4 break-words text-slate-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: preparePostText(post.content) }}
      />

      {/* Date - Comments */}
      <div className="mt-4 flex w-full items-center justify-between">
        <div className="flex">
          <div className="flex">
            <ArrowCircleUpIcon className="h-6 w-6 text-midnight dark:text-white" />
            <span className="ml-1 text-midnight dark:text-white">{post._count.likes}</span>
          </div>
          <div className="ml-4 flex">
            <ArrowCircleDownIcon className="h-6 w-6 text-midnight dark:text-white" />
            <span className="ml-1 text-midnight dark:text-white">{post._count.dislikes}</span>
          </div>
        </div>
        <div className="flex">
          <Link href={`/post/${post.id}`}>
            <a className="text-xs text-slate-700 hover:underline dark:text-gray-600">
              {new Date(post.createdAt).toLocaleDateString()}
            </a>
          </Link>
          <button className="flex items-center">
            <ChatAltIcon className="ml-4 h-6 w-6 text-primary" />
            <span className="ml-1 text-xs font-thin text-slate-700 dark:text-gray-400">
              {post._count.comments} <span className="sr-only">comments</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;

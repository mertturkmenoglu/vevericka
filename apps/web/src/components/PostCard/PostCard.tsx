import { ArrowDownIcon, ArrowUpIcon, ChatBubbleBottomCenterIcon, ShareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { LazyImage } from '../LazyImage';
import MoreMenu from './MoreMenu';

const images = [
  'https://fastly.picsum.photos/id/676/200/200.jpg?hmac=hgeMQEIK4Mn27Q2oLRWjXo1rgxwTbk1CnJE954h_HyM',
  'https://fastly.picsum.photos/id/822/2000/2000.jpg?hmac=Biy6RuHUnRpLPDvrJEKXHcNwp3SFb8opiBBQRx5WWRc',
  'https://fastly.picsum.photos/id/883/2000/2000.jpg?hmac=95xD0COVnXluo3kG8Rx0BQy4UojFiOPJ2hoanxJtWlM',
  'https://fastly.picsum.photos/id/74/1000/1000.jpg?hmac=qyw_GbDDT5ax1EE8yALr-sc0E7PyJyLByU4xUdyfRHA',
];

function PostCard(): JSX.Element {
  return (
    <article className="flex items-start space-x-2">
      <Link
        to={'#'}
        className="w-1/12"
      >
        <LazyImage
          src="https://github.com/mertturkmenoglu.png"
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-10 min-w-10 aspect-square h-10 w-10 rounded-md"
        />
      </Link>

      <div className="w-11/12">
        <div className="flex items-baseline space-x-2">
          <Link
            to={'#'}
            className="font-medium text-midnight hover:underline"
          >
            Mert Turkmenoglu
          </Link>
          <p className="text-xs text-neutral-600">@capreaee</p>
          <Link
            to={'#'}
            className="text-xs text-neutral-600 hover:underline"
          >
            2h
          </Link>
        </div>

        <p className="text-sm font-normal tracking-tighter sm:text-base sm:tracking-normal">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis et dolor. Minus quos itaque
          doloribus beatae porro, quisquam voluptas dolorem architecto magnam. Ad, odit provident possimus laudantium
          earum consequatur!
        </p>

        {images.length > 0 && Math.random() > 0.5 && (
          <div
            className={clsx('mt-4 grid gap-2', {
              'mx-auto grid-cols-1': images.length === 1,
              'grid-cols-2': images.length === 2 || images.length === 4,
              'grid-cols-3': images.length === 3,
            })}
          >
            {images.map((image) => (
              <button key={image}>
                <LazyImage
                  src={image}
                  alt="User image"
                  placeholderSrc="/user.jpg"
                  placeholderAlt="Loading"
                  className={clsx('h-full w-full rounded-md object-cover', {
                    'aspect-square': images.length !== 1,
                    'aspect-video': images.length === 1,
                  })}
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 rounded-md py-1 px-2 text-berry hover:bg-midnight/10">
              <ArrowUpIcon className="h-5 w-5" />
              <span className="text-sm">42</span>
            </button>
            <button className="flex items-center space-x-1 rounded-md py-1 px-2 hover:bg-midnight/10">
              <ArrowDownIcon className="h-5 w-5 text-midnight" />
              <span className="text-sm text-midnight">10</span>
            </button>

            <button className="flex items-center space-x-1 rounded-md py-1 px-2 hover:bg-midnight/10">
              <ChatBubbleBottomCenterIcon className="h-5 w-5 text-midnight" />
              <span className="text-sm text-midnight">5</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-md py-1 px-2 hover:bg-midnight/10">
              <ShareIcon className="h-5 w-5 text-midnight" />
              <span className="text-sm text-midnight">Share</span>
            </button>

            <MoreMenu />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;

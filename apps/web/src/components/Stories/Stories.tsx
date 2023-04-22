import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import TSwiper, { A11y, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyImage } from '../LazyImage';

const stories = [
  {
    thumbnail: 'https://fastly.picsum.photos/id/676/200/200.jpg?hmac=hgeMQEIK4Mn27Q2oLRWjXo1rgxwTbk1CnJE954h_HyM',
    visited: false,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/822/2000/2000.jpg?hmac=Biy6RuHUnRpLPDvrJEKXHcNwp3SFb8opiBBQRx5WWRc',
    visited: false,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/883/2000/2000.jpg?hmac=95xD0COVnXluo3kG8Rx0BQy4UojFiOPJ2hoanxJtWlM',
    visited: false,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/74/1000/1000.jpg?hmac=qyw_GbDDT5ax1EE8yALr-sc0E7PyJyLByU4xUdyfRHA',
    visited: false,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/63/2000/2000.jpg?hmac=yRj8RWtCCOHJHH6mz9sy4oWj19MeRih4_0Zh7a7aA5c',
    visited: true,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/910/2000/2000.jpg?hmac=jHbF-bbOfRpBv5TN9sMKyoyv5yc467EVHlzQ5Sgyprg',
    visited: true,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/318/2000/2000.jpg?hmac=0mSrQ5gNmThApkiHrMoxtTyG06RdDoo7CrviJBHPMGY',
    visited: true,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/320/2000/2000.jpg?hmac=lvRFTNqwFMP88W80_7uEO0A0pALtb1OPMM6xxpMJhKU',
    visited: true,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/320/2000/2000.jpg?hmac=lvRFTNqwFMP88W80_7uEO0A0pALtb1OPMM6xxpMJhKU',
    visited: true,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/320/2000/2000.jpg?hmac=lvRFTNqwFMP88W80_7uEO0A0pALtb1OPMM6xxpMJhKU',
    visited: true,
  },
  {
    thumbnail: 'https://fastly.picsum.photos/id/320/2000/2000.jpg?hmac=lvRFTNqwFMP88W80_7uEO0A0pALtb1OPMM6xxpMJhKU',
    visited: true,
  },
];

function Stories(): JSX.Element {
  const swiperRef = useRef<TSwiper | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <button
        id="stories-prev"
        className="text-midnight disabled:text-midnight/50"
        disabled={isBeginning}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeftIcon className="h-5 w-5 " />
      </button>

      <Swiper
        spaceBetween={8}
        slidesPerView={6}
        modules={[Navigation, A11y]}
        navigation={{
          prevEl: '.stories-prev',
          nextEl: '.stories-next',
        }}
        className="py-8"
        onInit={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {stories.map((story, index) => (
          <SwiperSlide
            className="px-2 py-4"
            key={story.thumbnail + index}
          >
            <button>
              <LazyImage
                src={story.thumbnail}
                alt="User image"
                placeholderSrc="/user.jpg"
                placeholderAlt="Loading"
                className={clsx('min-h-12 min-w-12 aspect-square h-12 w-12 rounded-full object-cover', {
                  'ring-2 ring-berry ring-offset-2': !story.visited,
                })}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        id="stories-next"
        className="text-midnight disabled:text-midnight/50"
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Stories;

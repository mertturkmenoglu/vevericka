// import { useQuery } from '@apollo/client';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import { useState } from 'react';
// import TSwiper from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import { Swiper, SwiperSlide } from 'swiper/react';
// // import { StoryFeedDocument } from '../../generated/graphql';
// import CreateStory from './CreateStory';
// import StoryItem from './StoryItem';

function Stories(): JSX.Element {
  // const { data, error, loading } = useQuery(StoryFeedDocument);
  // const [controller, setController] = useState<TSwiper | null>(null);
  // const [isBeginning, setIsBeginning] = useState(true);
  // const [isEnd, setIsEnd] = useState(false);

  // if (loading) return <div>Loading...</div>;

  // if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="flex items-center space-x-2 rounded bg-white py-2 dark:bg-neutral-800">
      {/*<CreateStory />*/}
      {/*{data && (*/}
      {/*  <>*/}
      {/*    {data.storyFeed.length > 0 && (*/}
      {/*      <>*/}
      {/*        <button*/}
      {/*          disabled={isBeginning}*/}
      {/*          className="text-midnight disabled:text-neutral-400"*/}
      {/*          onClick={() => {*/}
      {/*            controller?.slidePrev();*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ChevronLeftIcon className="h-6 w-6" />*/}
      {/*        </button>*/}
      {/*        <Swiper*/}
      {/*          modules={[Navigation, Pagination, A11y]}*/}
      {/*          slidesPerView={4}*/}
      {/*          className={'h-20 flex-1'}*/}
      {/*          onSwiper={(swiper) => {*/}
      {/*            setController(swiper);*/}
      {/*            setIsBeginning(swiper.isBeginning);*/}
      {/*            setIsEnd(swiper.isEnd);*/}
      {/*          }}*/}
      {/*          onSlideChange={(swiper) => {*/}
      {/*            setIsBeginning(swiper.isBeginning);*/}
      {/*            setIsEnd(swiper.isEnd);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {data &&*/}
      {/*            data.storyFeed.map((story, index) => (*/}
      {/*              <SwiperSlide key={index}>*/}
      {/*                <StoryItem story={story} />*/}
      {/*              </SwiperSlide>*/}
      {/*            ))}*/}
      {/*        </Swiper>*/}
      {/*        <button*/}
      {/*          disabled={isEnd}*/}
      {/*          className="text-midnight disabled:text-neutral-400"*/}
      {/*          onClick={() => {*/}
      {/*            controller?.slideNext();*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ChevronRightIcon className="h-6 w-6" />*/}
      {/*        </button>*/}
      {/*      </>*/}
      {/*    )}*/}

      {/*    {data.storyFeed.length === 0 && <div className="text-sm text-midnight dark:text-white">Add your story</div>}*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
}

export default Stories;

import { useQuery } from '@apollo/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';

import 'slick-carousel/slick/slick.css';
import { StoryFeedDocument } from '../../generated/graphql';
import StoryItem from './StoryItem';

function Stories(): JSX.Element {
  const { data, error, loading } = useQuery(StoryFeedDocument);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! {error.message}</div>;

  return (
    <Slider
      infinite={false}
      slidesToShow={6}
      slidesToScroll={6}
      arrows={true}
      autoplay={false}
      accessibility={true}
      centerMode={false}
      draggable={true}
      swipe={true}
      nextArrow={
        <button className="hover:cursor-pointer">
          <ChevronRightIcon className="h-8 w-8 text-midnight" />
        </button>
      }
      prevArrow={
        <button className="hover:cursor-pointer">
          <ChevronLeftIcon className="h-8 w-8 text-midnight" />
        </button>
      }
    >
      {data &&
        data.storyFeed.map((story, index) => (
          <StoryItem
            story={story}
            key={index}
          />
        ))}
    </Slider>
  );
}

export default Stories;

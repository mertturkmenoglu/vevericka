import { LazyImage } from '../index';
import { useBannerStyles } from './useBannerStyles';

export interface BannerProps {
  bannerImage: string;
  image: string;
}

function Banner({ bannerImage, image }: BannerProps): JSX.Element {
  const bannerStyles = useBannerStyles(bannerImage);

  return (
    <div
      className="relative aspect-video h-72 w-full rounded bg-cover"
      style={bannerStyles}
    >
      <LazyImage
        src={image}
        alt="User image"
        placeholderSrc="/user.jpg"
        placeholderAlt="Loading"
        className="min-h-32 min-w-32 absolute -bottom-16 left-16 h-32 w-32 rounded-full border-4 border-white dark:border-midnight"
      />
    </div>
  );
}

export default Banner;

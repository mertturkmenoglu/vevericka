import { ChartBarIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

export interface MetaButtonProps {
  type: 'image' | 'video' | 'poll';
  onClick?: () => Promise<void>;
}

export type MetaButtonType = MetaButtonProps['type'];

const iconMapping = {
  image: PhotoIcon,
  video: VideoCameraIcon,
  poll: ChartBarIcon,
} as const satisfies Record<MetaButtonType, TwIcon>;

function MetaButton({ type, onClick }: MetaButtonProps) {
  const Icon = iconMapping[type];
  return (
    <button
      className="rounded bg-midnight p-2 transition ease-in-out hover:bg-midnight/90"
      onClick={onClick}
    >
      <Icon className="h-4 w-4 text-white" />
    </button>
  );
}

export default MetaButton;

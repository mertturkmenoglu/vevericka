import { BookmarkIcon, FlagIcon, NoSymbolIcon, PaperAirplaneIcon, UserMinusIcon } from '@heroicons/react/24/outline';

export const moreMenuItems = [
  {
    text: 'Bookmark',
    action: () => {},
    icon: BookmarkIcon,
  },
  {
    text: 'Send via DM',
    action: () => {},
    icon: PaperAirplaneIcon,
  },
  {
    text: 'Unfollow',
    action: () => {},
    icon: UserMinusIcon,
  },
  {
    text: 'Block',
    action: () => {},
    icon: NoSymbolIcon,
  },
  {
    text: 'Report',
    action: () => {},
    icon: FlagIcon,
  },
] satisfies Array<{
  text: string;
  action: () => Promise<void> | void;
  icon: TwIcon;
}>;

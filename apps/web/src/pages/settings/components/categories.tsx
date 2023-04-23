import {
  BellIcon,
  CloudIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  IdentificationIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { MeQuery } from '../../../generated/graphql';
import AccountContainer from '../containers/account';
import ProfileContainer from '../containers/profile';
import Wip from '../containers/Wip';

interface ComponentProps {
  user: MeQuery;
}

export type Category = {
  key: string;
  name: string;
  component: (props: ComponentProps) => JSX.Element;
  icon: TwIcon;
};

export const categories = [
  {
    key: 'account',
    name: 'Account',
    component: AccountContainer,
    icon: UserIcon,
  },
  {
    key: 'profile',
    name: 'Profile',
    component: ProfileContainer,
    icon: IdentificationIcon,
  },
  {
    key: 'display',
    name: 'Display',
    component: Wip,
    icon: ComputerDesktopIcon,
  },
  {
    key: 'language',
    name: 'Language',
    component: Wip,
    icon: GlobeAltIcon,
  },
  {
    key: 'notifications',
    name: 'Notifications',
    component: Wip,
    icon: BellIcon,
  },
  {
    key: 'privacy',
    name: 'Privacy',
    component: Wip,
    icon: LockClosedIcon,
  },
  {
    key: 'your-data',
    name: 'Your Data',
    component: Wip,
    icon: CloudIcon,
  },
  {
    key: 'help',
    name: 'Help',
    component: Wip,
    icon: QuestionMarkCircleIcon,
  },
] satisfies Category[];

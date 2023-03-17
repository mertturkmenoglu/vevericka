import {
  UserIcon,
  IdentificationIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  BellIcon,
  CloudIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { SVGProps } from 'react';
import AccountContainer from '../containers/account';
import ProfileContainer from '../containers/profile';

export type Category = {
  key: string;
  name: string;
  component: () => JSX.Element;
  icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
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
    component: AccountContainer,
    icon: ComputerDesktopIcon,
  },
  {
    key: 'language',
    name: 'Language',
    component: AccountContainer,
    icon: GlobeAltIcon,
  },
  {
    key: 'notifications',
    name: 'Notifications',
    component: AccountContainer,
    icon: BellIcon,
  },
  {
    key: 'email',
    name: 'Email Settings',
    component: AccountContainer,
    icon: EnvelopeIcon,
  },
  {
    key: 'password-and-security',
    name: 'Password and Security',
    component: AccountContainer,
    icon: KeyIcon,
  },
  {
    key: 'privacy',
    name: 'Privacy',
    component: AccountContainer,
    icon: LockClosedIcon,
  },
  {
    key: 'your-data',
    name: 'Your Data',
    component: AccountContainer,
    icon: CloudIcon,
  },
  {
    key: 'help',
    name: 'Help',
    component: AccountContainer,
    icon: QuestionMarkCircleIcon,
  },
] satisfies Category[];

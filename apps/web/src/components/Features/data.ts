import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  GlobeAltIcon,
  HeartIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export const items = [
  {
    title: 'A place to connect',
    description:
      'Vevericka is a social media platform where you can share your thoughts and ideas with the world. It is a place where you can connect with people and make new friends.',
    icon: UserGroupIcon,
  },
  {
    title: 'It is free',
    description:
      'Vevericka is free to use. You can create an account and start sharing your thoughts and ideas with the world. It is free forever.',
    icon: FireIcon,
  },
  {
    title: 'In your language',
    description:
      'Vevericka is available in English but we plan to add more. Soon, you will choose your language and communicate with people from all over the world.',
    icon: GlobeAltIcon,
  },
  {
    title: 'Open Source',
    description:
      'Vevericka is open source. You can contribute to the project and help us make it better. We are always open to new ideas and suggestions.',
    icon: CodeBracketIcon,
  },
  {
    title: 'In your device',
    description:
      'Vevericka is available on the web, but we plan to add more. Soon, you will be able to use Vevericka on your mobile device.',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'It is cute',
    description:
      'Vevericka is sooo cute. Squirrels? Come on, who does not like squirrels? They are so cute and funny. You will love Vevericka.',
    icon: HeartIcon,
  },
] satisfies Array<{
  title: string;
  description: string;
  icon: TwIcon;
}>;

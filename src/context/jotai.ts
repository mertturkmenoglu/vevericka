import { atom } from 'jotai';

export type TUserAtom = {
  email: string;
  username: string;
  userId: string | number;
  image: string;
  name: string;
};

export const userAtom = atom<TUserAtom>({
  email: '',
  username: '',
  userId: '',
  image: '/assets/profile.png',
  name: '',
});

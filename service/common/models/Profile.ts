import { GenderOptions } from './GenderOptions';
import { SpeakingLanguage } from './SpeakingLanguage';
import { WishToSpeak } from './WishToSpeak';

export interface Profile {
  id: number;
  username: string;
  email: string;
  name: string;
  image: string;
  job: string | null;
  twitterHandle: string | null;
  school: string | null;
  birthDate: Date | null;
  website: string | null;
  description: string | null;
  verified: boolean;
  protected: boolean;
  bannerImage: string;
  gender: GenderOptions | null;
  genderOther: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
  speaking: SpeakingLanguage[];
  wishToSpeak: WishToSpeak[];
  features: string[];
  hobbies: string[];
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isThisUser: boolean;
  isFollowedByThisUser: boolean;
}
